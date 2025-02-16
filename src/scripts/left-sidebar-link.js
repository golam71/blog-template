function handlePageLoad() {
    const blog = document.querySelector("main.animate");
    const tocItems = document.querySelectorAll(".toc-item");
    const headings = blog.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    for (const item of tocItems) {
                        item.classList.remove("active-table-of-contents-link");
                        if (item.getAttribute("href") === `#${targetId}`) {
                            item.classList.add("active-table-of-contents-link");
                        }
                    }
                }
            }
        },
        {
            root: null,
            rootMargin: "0px 0px -90% 0px", // Adjusted rootMargin for better visibility
            threshold: [0], // Single threshold for better accuracy
        },
    );

    for (const heading of headings) {
        observer.observe(heading);
    }
}

document.addEventListener("astro:page-load", handlePageLoad);
