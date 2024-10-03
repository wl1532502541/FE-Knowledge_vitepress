<template>
  <NCard>
    <template #header>
      <div class="flex justify-between">
        <span>title</span>
        <div class="flex gap-1">
          <span>复制</span>
          <NButton @click="handleToggle">展开</NButton>
        </div>
      </div>
    </template>

    <n-collapse v-model:expanded-names="names">
      <template #arrow>
        <div></div>
      </template>
      <n-collapse-item name="1">

        <template #header>
          <Preview></Preview>
        </template>
        <template #header-extra>
          <!-- Extra -->
        </template>
        <VueSfcEditor></VueSfcEditor>
      </n-collapse-item>
    </n-collapse>

  </NCard>
</template>

<script setup>
import VueSfcEditor from "./VueSfcEditor.vue";
import Preview from "./Preview/index.vue";
import { provide, reactive, ref } from "vue";
import {
  parse,
  compileScript,
  compileTemplate,
  compileStyle,
} from "@vue/compiler-sfc";
const names = ref([])
const handleToggle = () => {
  if (names.value.length) {
    names.value = []
  } else {
    names.value = ['1']
  }
}


// 默认代码
const DefaultCode = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
<\/script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`;

const state = reactive({
  // sfc 源代码
  code: DefaultCode.trim(),
  updateCode (code) {
    state.code = code;
  },

  // 编译过程
  compile (code) {
    const { descriptor } = parse(code);
    let _code = `
    if(window.__app__){
      window.__app__.unmount();
    }
    window.__app__ = null;
    `;

    const componentName = "__AppVue__";

    // 编译脚本。
    if (descriptor.script || descriptor.scriptSetup) {
      const script = compileScript(descriptor, {
        inlineTemplate: true,
        id: descriptor.filename,
      });

      _code += script.content.replace(
        "export default",
        `window.${componentName} =`
      );
    }

    // 非 setup 模式下，需要编译 template。
    if (!descriptor.scriptSetup && descriptor.template) {
      const template = compileTemplate(descriptor.template, {
        id: descriptor.filename,
      });
      _code =
        _code +
        ";" +
        template.code.replace(
          "export function",
          `window.${componentName}.render = function`
        );
    }

    // 创建 vue app 实例并渲染。
    _code += `;
      import { createApp } from "vue";

      window.__app__ = createApp(window.${componentName});
      window.__app__.mount("#app");

      if (window.__style__) {
        window.__style__.remove();
      }
    `;

    // 编译 css 样式。
    if (descriptor.styles?.length) {
      const styles = descriptor.styles.map((style) => {
        return compileStyle({
          source: style.content,
          id: descriptor.filename,
        }).code;
      });

      _code += `
      window.__style__ = document.createElement("style");
      window.__style__.innerHTML = ${JSON.stringify(styles.join(""))};
      document.body.appendChild(window.__style__);
      `;
    }

    return _code;
  },
});

provide("store", state);
</script>

<style scoped>
.vue-playground {
  display: flex;
  height: 100%;
}

.vue-playground>* {
  flex: 1;
}
</style>