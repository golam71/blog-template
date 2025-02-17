document.addEventListener("astro:page-load", (event) => {
	const URL = window.location.href.split("#")[0].replace(/\/$/, "");

	for (const item of document.querySelectorAll("#blogs-link-table div div a")) {
		if (item.href === URL) {
			console.log(URL);
			item.style = "color:var(--accent);";
		}
	}
});
