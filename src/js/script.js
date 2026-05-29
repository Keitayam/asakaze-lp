// スムーズスクロール


// ヘッダーの高さを取得（画面幅によって分岐）
const headerHeight = window.innerWidth > 97;

// ページ内リンクを取得してスムーススクロールを設定
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = href === '#' || href === '' ? document.documentElement : document.querySelector(href);
    if (target) {
      const position = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  });
});

const header = document.querySelector("header");
const fv = document.querySelector("#fv");

if (header && fv) {
  const fvHeight = fv.offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.scrollY > fvHeight) {
      header.classList.add("is-active");
    } else {
      header.classList.remove("is-active");
    }
  });
}

//slider
document.addEventListener("DOMContentLoaded", function () {
  const splide = new Splide(".splide", {
  type: "loop",
  pauseOnHover: false,
  pauseOnFocus: false,
  arrows: false,
  pagination: false,
  autoWidth: true,
  gap: "66px",
  focus: "center",
  trimSpace: false,

  breakpoints: {
    768: {
      gap: "20px",
      pagination: true,
    }
  }
  });
  splide.mount();


  // slideUp
  function slideUp(el, duration = 300) {
    el.style.height = el.offsetHeight + "px";
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    setTimeout(() => {
      el.style.display = "none";
      el.style.removeProperty("height");
      el.style.removeProperty("padding-top");
      el.style.removeProperty("padding-bottom");
      el.style.removeProperty("margin-top");
      el.style.removeProperty("margin-bottom");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
    }, duration);
  };

  // slideDown
  function slideDown(el, duration = 300) {
    el.style.removeProperty("display");
    let display = window.getComputedStyle(el).display;
    if (display === "none") {
      display = "flex";
    }
    el.style.display = display;
    let height = el.offsetHeight;
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.height = height + "px";
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    setTimeout(() => {
      el.style.removeProperty("height");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
    }, duration);
  };

  // slideToggle
  function slideToggle(el, duration = 300) {
    if (window.getComputedStyle(el).display === "none") {
      return slideDown(el, duration);
    } else {
      return slideUp(el, duration);
    }
  };

  function getSiblings(e) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
      return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;

    // collecting siblings
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };

  //親要素の同じ階層の要素をすべて取得(element以外)
  function getParents(element) {
    var parent = element.parentNode;
    return getSiblings(parent);
  }

  var accordionTitles = document.querySelectorAll('.accordion_title');
  accordionTitles.forEach((accordionTitle) => {
    accordionTitle.addEventListener('click', function () {
      accordionTitle.classList.toggle('is-active');
      slideToggle(accordionTitle.nextElementSibling);

      //常に開いているアコーディオンは一つの状態
      var accordionItems = getParents(accordionTitle);
      accordionItems.forEach(accordionItem => {
        var targetTitle = accordionItem.querySelector('.accordion_title');
        var targetContent = accordionItem.querySelector('.accordion_content');
        slideUp(targetContent);
        targetTitle.classList.remove('is-active');
      })


    })


  })
});


