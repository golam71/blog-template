document.addEventListener('astro:page-load', () => {
    // Inject CSS into the document
    const style = document.createElement("style");
    style.innerHTML = `
        .copy-button {
            position: absolute;
            top: 8px;
            right: 8px;
            background: var(--main-bg, rgba(0, 0, 0, 0.7)); /* Use CSS variable */
            color: var(--heading);
            border: none;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            border-radius: 7px;
            display: none; /* Initially hidden */
        }

        pre.astro-code {
            position: relative;
        }

        pre.astro-code:hover .copy-button {
            display: block; /* Show button on hover */
        }
    `;
    document.head.appendChild(style);

    // Add copy button to all <pre class="astro-code"> elements
    const preElements = document.querySelectorAll("pre.astro-code");
    for (const pre of preElements) {
        const button = document.createElement("button");
        button.innerText = "Copy";
        button.classList.add("copy-button");

        pre.appendChild(button);

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
