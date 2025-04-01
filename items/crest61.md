---
title: "Crest 61 - A diy ortholinear split keyboard"
date: "2024-11-25"
tags: ["project"]
---

<figure class="full-image">
  <Image src="images/crest61/board.png" alt="Alt text"/>
  <figcaption>looks good, doesnt it?</figcaption>
</figure>

<span class="first">T</span>his project was definitely a long time coming, and is my first major project (although still in its first revision). It is, interestingly, a perfect first project which introduced me into the hobby electronics world, deriving from my interest with keyboards.

This surprisingly is only my second keyboard build, much farther down the rabbit hole than you would expect by now, but that's only because my dwindling funds could not support a new keyboard purchase every single time a [nice case](https://www.alexotos.com/neo-ergo-review/) dropped, or a [new switch](https://www.theremingoat.com/blog/gateron-g-pro-3-yellow-switch-review) caught my interest. *(I sure was tempted though)*

So I decided to jump straight to endgame(ish) and build my own from scratch, using help from:
 - [This video](https://www.youtube.com/watch?v=7UXsD7nSfDY&list=WL&index=56) from Christian Selig
 - [This video](https://www.youtube.com/watch?v=M_VuXVErD6E&list=WL&index=55) amongst others from Ben Vallack
 - and [FlatFootFox's](https://flatfootfox.com/ergogen-introduction/) amazing Ergogen guide

## Specs
- Custom ortholinear layout, designed in ergogen
- Hand lubed gateron milky yellows *(classic)*
- TX "AP" Revision 4 stabs
- Some cheap knockoff xda botanical caps from [aliexpress](https://www.aliexpress.com/item/1005004559625865.html?spm=a2g0o.order_list.order_list_main.132.73831802i6AbES)
    - which have japanese legends on them, since they were the only ones available 😔 oh well...
- Gasket mounted (which, in hindsight, was a bit of a mistake but i'll get to that later)
- two rotary encoders 🤗
- supermini nrf52840 (nice!nano clones which run the same)
- ble with an 1800mAh battery for each side.


That is basically all I can think of for specs.

## Design

<figure class="right-image">
  <Image src="images/crest61/ergogen-right.png" alt="Alt text"/>
  <figcaption>right half !!</figcaption>
</figure>

The design state was definitely the most fun, allowing me to do basically whatever I wanted without much consequence. 

#### Layout

The first step was to make an ortholinear keyboard layout with [ergogen](https://ergogen.cache.works/), which takes in a yaml/json file and outputs layouts drawings and a netted kicad file.

>You can see the layout I settled with for the right side 👉, with the left side being a quite similar mirror image.

While designing this layout, I had a few problems which I initially aimed to solve:
- my left hand 👍 could comfortably touch type, but my right hand 🖐 needs to hover over the keyboard to press enter and backspace.
  - I could easily solve this by harnessing the power of a split spacebar, which was replaced on the right side with backspace and return.
- keys need to stay in generally similar positions, especially on the left side, to avoid rebinding keys in cad software and games.
  - I retained the `;` , `[`, and `'` keys on the right side, with `]` and `\` being relegated to a different layer.
  - the space bar was also kept in half size on the left side, as I use its entire length when typing vs gaming.
- I hate [mod tap](https://zmk.dev/docs/keymaps/behaviors/hold-tap) behaviour, so I would like to retain the modifier keys.
  - I just kind of kept them where they were instead of getting rid of them like most ortho layouts. the alt key was placed on a slight tilt to accomodate the curve of the space bar. 😃
- and I heavily use the arrow keys while gaming and navigating code, so I would like to keep them on the base layer.
  - these remain in a small detached cluster, similar to that in the [keychron q1](https://keychron.com.au/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard).

#### PCB

In this stage, I was forced to learn the pcb editor [kicad](https://www.kicad.org/), which actually had a smoother learning curve than I first expected.

<figure class="left-image">
  <Image src="images/crest61/kicad-right.png" alt="Alt text"/>
  <figcaption>what beautiful professional traces</figcaption>
</figure>

Ergogen generates a netted pcb file for you, which means you can import it straight into kicad, and all the connections are marked for you to join with traces. The image to the left is of the left side pcb, with all the traces drawn into place. 

This is actually where we have to start being pedantic, because this design will get shipped off to China to be manufactured. 😨

The hardest part about this stage was accounting for the fact that my keyboard was designed to be a sort of hybrid between your [typical ortho split](https://github.com/foostan/crkbd) and a [classic 75%](https://keychron.com.au/collections/75-layout-keyboards/products/keychron-k2-wireless-mechanical-keyboard). Since my board has two keys larger than 1.75u, it needs fitting stab holes in the pcb. 

Designing the pcbs was fairly difficult, however unforunately for me, it was not the hardest part of the project...

#### Case 

<figure class="center-image">
  <Image src="images/crest61/fusion-right.png" alt="Alt text"/>
  <figcaption></figcaption>
</figure>

I'd like to preface this section by saying that I am by no means a professional, only slightly casually experienced in the field of CAD design, and if you have proper experience, I urge you to stop reading for your own sanity... 


