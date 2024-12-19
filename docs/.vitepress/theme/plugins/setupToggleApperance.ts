import { nextTick, provide, App } from "vue";
import { useData } from "vitepress";

export function setupToggleAppearance() {
  const { isDark } = useData();

  const enableTransitions = () =>
    "startViewTransition" in document &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  const toggleAppearance = async ({ clientX: x, clientY: y }: MouseEvent) => {
    if (!enableTransitions()) {
      isDark.value = !isDark.value;
      return;
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )}px at ${x}px ${y}px)`,
    ];

    await document.startViewTransition(async () => {
      isDark.value = !isDark.value;
      await nextTick();
    }).ready;

    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: "ease-in",
        pseudoElement: `::view-transition-${
          isDark.value ? "old" : "new"
        }(root)`,
      }
    );
  };

  provide("toggle-appearance", toggleAppearance);
  injectStyles();
}

// Dynamically inject styles
export function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }

    ::view-transition-old(root),
    .dark::view-transition-new(root) {
      z-index: 1;
    }

    ::view-transition-new(root),
    .dark::view-transition-old(root) {
      z-index: 9999;
    }

    .VPSwitchAppearance {
      width: 22px !important;
    }

    .VPSwitchAppearance .check {
      transform: none !important;
    }
  `;
  document.head.appendChild(style);
}
