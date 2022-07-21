(() => {
  // packages/ui/src/dialog.js
  function dialog_default(Alpine) {
    Alpine.directive("dialog", (el, directive) => {
      if (directive.value === "overlay")
        handleOverlay(el, Alpine);
      else if (directive.value === "panel")
        handlePanel(el, Alpine);
      else if (directive.value === "title")
        handleTitle(el, Alpine);
      else if (directive.value === "description")
        handleDescription(el, Alpine);
      else
        handleRoot(el, Alpine);
    });
    Alpine.magic("dialog", (el) => {
      let $data = Alpine.$data(el);
      return {
        get open() {
          return $data.__isOpen;
        },
        close() {
          $data.__close();
        }
      };
    });
  }
  function handleRoot(el, Alpine) {
    Alpine.bind(el, {
      "x-data"() {
        return {
          init() {
            Alpine.bound(el, "open") !== void 0 && Alpine.effect(() => {
              this.__isOpenState = Alpine.bound(el, "open");
            });
            if (Alpine.bound(el, "initial-focus") !== void 0)
              this.$watch("__isOpenState", () => {
                if (!this.__isOpenState)
                  return;
                setTimeout(() => {
                  Alpine.bound(el, "initial-focus").focus();
                }, 0);
              });
          },
          __isOpenState: false,
          __close() {
            if (Alpine.bound(el, "open"))
              this.$dispatch("close");
            else
              this.__isOpenState = false;
          },
          get __isOpen() {
            return Alpine.bound(el, "static", this.__isOpenState);
          }
        };
      },
      "x-modelable": "__isOpenState",
      "x-id"() {
        return ["alpine-dialog-title", "alpine-dialog-description"];
      },
      "x-show"() {
        return this.__isOpen;
      },
      "x-trap.inert.noscroll"() {
        return this.__isOpen;
      },
      "@keydown.escape"() {
        this.__close();
      },
      ":aria-labelledby"() {
        return this.$id("alpine-dialog-title");
      },
      ":aria-describedby"() {
        return this.$id("alpine-dialog-description");
      },
      role: "dialog",
      "aria-modal": "true"
    });
  }
  function handleOverlay(el, Alpine) {
    Alpine.bind(el, {
      "x-init"() {
        if (this.$data.__isOpen === void 0)
          console.warn('"x-dialog:overlay" is missing a parent element with "x-dialog".');
      },
      "x-show"() {
        return this.__isOpen;
      },
      "@click.prevent.stop"() {
        this.$data.__close();
      }
    });
  }
  function handlePanel(el, Alpine) {
    Alpine.bind(el, {
      "@click.outside"() {
        this.$data.__close();
      },
      "x-show"() {
        return this.$data.__isOpen;
      }
    });
  }
  function handleTitle(el, Alpine) {
    Alpine.bind(el, {
      "x-init"() {
        if (this.$data.__isOpen === void 0)
          console.warn('"x-dialog:title" is missing a parent element with "x-dialog".');
      },
      ":id"() {
        return this.$id("alpine-dialog-title");
      }
    });
  }
  function handleDescription(el, Alpine) {
    Alpine.bind(el, {
      ":id"() {
        return this.$id("alpine-dialog-description");
      }
    });
  }

  // packages/ui/src/index.js
  function src_default(Alpine) {
    dialog_default(Alpine);
  }

  // packages/ui/builds/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(src_default);
  });
})();
