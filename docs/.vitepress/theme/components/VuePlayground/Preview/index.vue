<template>
  
  <div class="preview" ref="preview"></div>
</template>

<script setup>
import { ref, onMounted, watch, inject, onUnmounted } from "vue";
import PreviewTemplate from "./preview-template.html?raw";

const preview = ref();

let proxy = null;

// 注入store
const store = inject("store");

// 创建沙盒
function createSandbox () {
  const template = document.createElement("iframe");
  template.setAttribute("frameborder", "0");
  template.style = "width: 100%; height:100%";
  template.srcdoc = PreviewTemplate;
  preview.value.appendChild(template);

  template.onload = () => {
    proxy = createProxy(template);
  };
}

// 创建代理，用于监听code 变化，告诉沙盒重新渲染
function createProxy (iframe) {
  let _iframe = iframe;

  const stopWatch = watch(() => store?.code, compile, { immediate: true });

  function compile (code) {
    if (!code?.trim()) return;

    const compiledCode = store?.compile(code);

    _iframe.contentWindow.postMessage(
      { type: "eval", code: compiledCode },
      "*"
    );
  }

  // 销毁沙盒
  function destory () {
    _iframe?.remove();
    _iframe = null;
    stopWatch?.();
  }

  return {
    compile,
    destory,
  };
}

onMounted(createSandbox);
onUnmounted(() => proxy?.destory());
</script>

<style scoped>
.preview {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>