document.addEventListener('astro:page-load', () => {
    const items = document.querySelectorAll(
        "main.animate > :is(h1, h2, h3, h4, h5, h6)",
    );

    document.head.appendChild(
        Object.assign(document.createElement("style"), {
            textContent: `
                .accent { color: var(--accent); }
                .heading-link { cursor: pointer; margin: 10px ; padding:10px; visibility: hidden; }
                :is(h1, h2, h3, h4, h5, h6):hover .heading-link { visibility: visible; }
                :is(h1, h2, h3, h4, h5, h6):active .heading-link { visibility: visible; }
                :is(h1, h2, h3, h4, h5, h6):hover { cursor: pointer; }
            `,
        }),
    );

    for (const item of items) {
        const id =
            item.id || item.textContent.trim().toLowerCase().replace(/\s+/g, "-");
        item.id = id;

        const link = document.createElement("span");
        link.classList.add("heading-link", "accent");
        link.textContent = "#";
        item.appendChild(link);

        link.addEventListener("click", (event) => {
            event.stopPropagation();
            const url = `${window.location.origin}${window.location.pathname}#${id}`;
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    link.textContent = "✔";
                    setTimeout(() => {
                        link.textContent = "#";
                    }, 500);
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
        });

        item.addEventListener("click", () => {
            item.classList.add("accent");
            window.location.hash = `#${id}`;
            setTimeout(() => {
                item.classList.remove("accent");
            }, 500);
        });
    }
});
