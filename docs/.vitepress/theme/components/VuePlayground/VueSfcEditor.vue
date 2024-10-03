<template>
  <div style="width: 100%; height: 100%" ref="vueSfcEditor"></div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { vue } from "@codemirror/lang-vue";
import { oneDark } from "@codemirror/theme-one-dark";
const vueSfcEditor = ref();

// 注入store
const store = inject("store");

onMounted(() => {
  if (!vueSfcEditor.value) return;

  new EditorView({
    doc: store.code,
    extensions: [
      basicSetup, // 添加行号、撤销历史、代码折叠、语法高亮等功能
      vue(), // 添加 vue sfc 的语法解析,
      // 全屏展示
      EditorView.theme({
        "&": { height: "100%" },
        ".cm-scroller": { overflow: "auto" },
      }),
      EditorView.updateListener.of((view) => {
        if (view.docChanged) {
          store.updateCode(view.state.doc.toString());
        }
      }),
      oneDark,
    ],
    parent: vueSfcEditor.value
  });
});
</script>