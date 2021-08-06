'use strict';

const container = document.querySelector('.container');
const nav_left_ul = document.querySelector('.nav-left ul');

let map = new Map();
let previous_focused = "";
let previous_focused_li = "";

function click_on_arrow(parent_ul) {
  // if (!click_on_arrow.titles_not_arrow_focused)  {
    
  // }
  const titles_arrow = parent_ul.querySelectorAll('.title_arrow');
  const titles_not_arrow = parent_ul.querySelectorAll('.not_arrow');
  // const titles_icon = parent_ul.querySelectorAll('.title_icon');
  // console.log(titles_not_arrow);
  // console.log(titles_arrow);
  
  titles_arrow.forEach((title_arrow) => {
    const title_li = title_arrow.parentElement.parentElement;
    // console.log(title_li);
    title_li.addEventListener('click', (e) => {
      // const currentTarget_li = e.currentTarget;
      e.stopPropagation();
      add_arrow_rotation(title_li);
    });
  });

  titles_not_arrow.forEach((title_not_arrow) => {
    title_not_arrow.addEventListener('click', (e) => {
      e.stopPropagation();
      const title_li = title_not_arrow;
      const title_h1 = title_not_arrow.querySelector('h1');
      const svg_icon = title_not_arrow.querySelector('.svg_icon');
      // console.log(title_h1);
      // let previous_focused = titles_not_arrow_focused;
      if ( previous_focused !== title_h1) {
        title_h1.style.color = "#5b22f2";
        title_li.style.background = '#c2a2f1';
        try {
        previous_focused.style.color = '#999';
        previous_focused_li.style.background = '';
          }catch(err){ console.log(err.message) }

        previous_focused = title_h1;
        previous_focused_li = title_li;
      }
      
      
    });
  });

  // titles_icon.forEach((title_icon) => {
  //   title_icon

  // })
}

// add_arrow_rotation
function add_arrow_rotation(currentTarget_li) {
  // console.log(currentTarget_li);
  const wrapper_li = currentTarget_li.querySelector('.wrapper_li');
  const svg_icon = currentTarget_li.querySelector('.svg_icon');

  // console.log(wrapper_li);
  const title_text = wrapper_li.querySelector('h1');
  const title_arrow = wrapper_li.querySelector('.title_arrow');
  // console.log(title_arrow);
  if (title_arrow.classList.contains('arrow_rotation')) {
    title_text.style.color = '#999';
    if (svg_icon) svg_icon.classList.remove('svg_icon_focused');
    title_arrow.classList.remove('arrow_rotation');
    const toDelete = wrapper_li.nextSibling;
    // console.log(toDelete, currentTarget);
    toDelete.remove();
  } else {
    title_text.style.color = '#000';
    // svg_icon.style.stroke = '#fff';
    if (svg_icon) svg_icon.classList.add('svg_icon_focused');
    // console.log(svg_icon);
    title_arrow.classList.add('arrow_rotation');
    // const parent = wrapper_li.parentElement;
    let titles = map.get(currentTarget_li);

    const parent_ul = document.createElement('ul');
    currentTarget_li.appendChild(parent_ul);
    display_nav_left_titles(titles, parent_ul);
  }
}

// fetch_nav_let_titles
async function fetch_nav_left_titles() {
  const headers = await fetch('./assets/nav-left-json/titles.json').catch(
    (err) => console.log(`error occured: ${err.message}`)
  );
  const titles = await headers
    .json()
    .catch((err) => console.log(`error occured: ${err.message}`));
  display_nav_left_titles(titles, nav_left_ul);
}

let i = 0;
let parent_ul_originel;


function decideToDelete(toDelete, toDisplay) {
  // console.log(toDelete.children)
  // [].__proto__.forEach.call(toDelete.children,(element) => {
  //   if (element.querySelector('ul') === toDisplay) {

  //     return true;

  //   }
  // });

  if ( [].__proto__.includes.call( toDisplay.parentElement.parentElement.children, toDelete ) ) return true;
  return false;
}

// display_nav_left_titles
const display_nav_left_titles = function fct(titles, parent_ul) {
  // console.log('hola: ', titles);
  if (!fct.selected) {
    // console.log('first time')
    fct.selected = parent_ul;
    parent_ul_originel = parent_ul;
  }

  titles.forEach((title, index, arr) => {
    display_one_title(title, parent_ul,);
  });
  // parent_ul.remove();
  if (
    fct.selected !== parent_ul_originel && 
    document.body.contains(fct.selected) &&
    parent_ul.parentElement.parentElement === parent_ul_originel

     ) {
      const svg_icon = fct.selected.parentElement.querySelector('.svg_icon');
    // console.log(fct.selected.parentElement);
    // console.log('paren_ul: ', fct.selected.parentElement.parentElement.parentElement) ;
    // console.log(fct.selected)
    
    fct.selected.parentElement.querySelector('h1').style.color = '#999';
    fct.selected.parentElement.querySelector('.title_arrow').classList.remove('arrow_rotation');
    svg_icon.classList.remove('svg_icon_focused');
    fct.selected.remove();
  }

      // if (i==0) {
      const degree = titles[0].degree;
      // console.log(parent_ul);
      const wrappers_li = parent_ul.querySelectorAll('.wrapper_li');
      wrappers_li.forEach((wrapper_li) => {
        wrapper_li.style.paddingLeft = `${degree * 25}px`;
        wrapper_li.style.paddingRight = `${degree * 20}px`;
        wrapper_li.style.paddingTop = `${(4 - degree / 2) * 3}px`;
        wrapper_li.style.paddingBottom = `${(4 - degree / 2) * 3}px`;
      });
      
      const sub_titles_arrow = parent_ul.querySelectorAll('.title_arrow');
      const sub_svg_arrow = parent_ul.querySelectorAll('.arrow');
      sub_svg_arrow.forEach((svg_arrow) => {
        // if (degree !== 0) {
        svg_arrow.style.width = `${(6 - degree / 2) * 3}px`;
        // }
      });
  // console.log('sub: ',sub_titles);
  // parent_ul.style.paddingRight = `${degree * 20}px`;

  click_on_arrow(parent_ul);
  // i=1;
  // }
  if (parent_ul.parentElement.parentElement === parent_ul_originel) {
    // console.log("parent",parent_ul.parentElement.parentElement)
      fct.selected = parent_ul;
    }
};

// display_one_title
function display_one_title(element, parent,) {
  const title_li = document.createElement('li');
  const title_link = document.createElement('a');
  const title_icon = document.createElement('div');
  const title_text = document.createElement('h1');
  const wrapper_li = document.createElement('div');

  title_li.classList.add('title_li');
  wrapper_li.classList.add('wrapper_li');
  // title_link.href = '#';
  // title_link.onclick = "event.preventDefault();";
  title_text.innerHTML = element.title;
  title_icon.classList.add('icon');
  title_icon.innerHTML = element.icon;
  if (element.frame) {
    title_icon.classList.add('frame');
    title_icon.style.background = element.color;
  }
  if (element.icon) {
  title_link.appendChild(title_icon);
  title_link.style.justifyContent = 'initial';
  }
  title_link.appendChild(title_text);
  wrapper_li.appendChild(title_link);
  // title_li.appendChild(title_link);

  if (element['sub-titles'].length) {
    const title_arrow = document.createElement('div');
    title_arrow.innerHTML = element.arrow;
    title_arrow.classList.add('title_arrow');
    wrapper_li.appendChild(title_arrow);
    map.set(title_li, element['sub-titles']);
    // title_li.appendChild(title_arrow);
  } else {
    title_li.classList.add('not_arrow');
  }
  if ( element['icon'] ) {
    title_li.classList.add('title_icon');
  }
  title_li.appendChild(wrapper_li);
  parent.appendChild(title_li);
}

const titles_promise = fetch_nav_left_titles();
// display_nav_left_titles(titles_promise, nav_left_ul);
