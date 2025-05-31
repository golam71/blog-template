document.addEventListener("astro:page-load", () => {
  // Inject CSS into the document
  const style = document.createElement("style");
  style.innerHTML = `
        .code-wrapper {
            position: relative;
        }

        .copy-button {
            position: absolute;
            top: 40px;
            right: 10px;
            background: var(--main-bg); /* Use CSS variable */
            color: var(--heading);
            border: 1px solid var(--border-color);
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            border-radius: 7px;
            display: none;
            z-index: 10;
        }

        @media (max-width: 1350px) {
            .code-wrapper:focus-within .copy-button {
                display: block;
            }
        }

        .code-wrapper:hover .copy-button {
            display: block;
        }
    `;
  document.head.appendChild(style);

  // Wrap each pre.astro-code with a wrapper and add button
  const preElements = document.querySelectorAll("pre.astro-code");
  for (const pre of preElements) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("code-wrapper");
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.innerText = "Copy";
    button.classList.add("copy-button");

    wrapper.appendChild(button); // outside scroll area

    button.addEventListener("click", async () => {
      const code = pre.querySelector("code").innerText;
      try {
        await navigator.clipboard.writeText(code);
        button.innerText = "Copied!";
        setTimeout(() => {
          button.innerText = "Copy";
        }, 500);
      } catch (err) {
        console.error("Failed to copy!", err);
        button.innerText = "Failed!";
      }
    });
  }
});
