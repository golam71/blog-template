document.addEventListener("astro:page-load", () => {
  document.querySelectorAll("pre.astro-code").forEach((pre) => {
    let windowTop = document.createElement("div");
    windowTop.className = "window_top";
    windowTop.innerHTML = `
            <span class="window_title">${document.title}</span>
            <span class="window_dot bg-green"></span>
            <span class="window_dot bg-yellow"></span>
            <span class="window_dot bg-red"></span>
        `;

    pre.parentNode.insertBefore(windowTop, pre);
    pre.style.borderLeft = "3px solid var(--light-bg)";
    pre.style.borderRight = "3px solid var(--light-bg)";
    pre.style.borderBottom = "3px solid var(--light-bg)";
    pre.style.borderTopLeftRadius = "0px";
    pre.style.borderTopRightRadius = "0px";
    pre.style.marginTop = "0px";
  });
  const style = document.createElement("style");
  style.innerHTML = `
    .window_top {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--light-bg);
        padding: 0px 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        height:30px;
        font-size:15px;
    }
    .window_title {
        flex-grow: 1;
        color : var(--text);
        text-align: center;
    }
    .window_dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-left: 10px;
        display: inline-block;
    }
    .bg-red { background: #ff3e3e; }
    .bg-yellow { background: #ffaf00; }
    .bg-green { background: #9fef00; }
`;
  document.head.appendChild(style);
});
