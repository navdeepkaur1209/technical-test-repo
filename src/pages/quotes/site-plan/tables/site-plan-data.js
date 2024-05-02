const sitePlanData = [
  {
    id: 1,
    type: 'text',
    src: './box-1.png',
    content: 'NEIGH 4',
    styles: {
      fontSize: '14px',
      fontFamily: 'Arial',
      fontWeight: '300',
      color: '#000',
      border: '1px solid #000',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      boxSizing: 'border-box',
      lineHeight: 1.2
    }
  },
  {
    id: 2,
    type: 'text',
    src: './box-2.png',
    content: '600mn\n Woven Lattice',
    styles: {
      fontSize: '14px',
      fontFamily: 'Arial',
      fontWeight: '300',
      color: '#000',
      border: '1px solid #000',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      boxSizing: 'border-box',
      lineHeight: 1.2
    }
  },
  {
    id: 3,
    type: 'text',
    src: './box-3.png',
    width: '100',
    content: 'Client to move\n vegetation, form\n fenceline, thanks you',
    styles: {
      fontSize: '14px',
      fontFamily: 'Arial',
      fontWeight: '300',
      color: '#000',
      border: '1px solid #000',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      boxSizing: 'border-box',
      lineHeight: 1.2
    }
  },
  {
    id: 4,
    type: 'text',
    src: './box-4.png',
    width: '100',
    content: 'Neighbour to\n move items,\n from fenceline,\n thanks you',
    styles: {
      fontSize: '14px',
      fontFamily: 'Arial',
      fontWeight: '300',
      color: '#000',
      border: '1px solid #000',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 4,
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      boxSizing: 'border-box',
      lineHeight: 1.2
    }
  },
  {
    id: 5,
    type: 'img',
    src: './1-panel-rake.png'
  },
  {
    id: 6,
    type: 'img',
    src: './2-panel-rale.png'
  },
  {
    id: 7,
    type: 'img',
    src: './2nd-panel-rake.png'
  },
  {
    id: 8,
    type: 'img',
    src: './3rd-panel-rake.png'
  },
  {
    id: 17,
    type: 'img',
    src: './full-height-finish.png'
  },
  {
    id: 9,
    type: 'img',
    src: './4th-panel-rake.png'
  },
  {
    id: 20,
    type: 'img',
    src: './icon-2.png'
  },
  {
    id: 47,
    type: 'img',
    src: './tree.png'
  },
  {
    id: 11,
    type: 'img',
    src: './circle-1.png'
  },
  {
    id: 12,
    type: 'img',
    src: './circle-2.png'
  },
  {
    id: 21,
    type: 'img',
    src: './icon.png'
  },
  {
    id: 37,
    type: 'img',
    src: './pool.png'
  },
  {
    id: 10,
    type: 'img',
    src: './black-shape.png'
  },
  {
    id: 38,
    type: 'img',
    src: './red-shape.png'
  },
  {
    id: 13,
    type: 'img',
    src: './dark-grey-shape.png'
  },
  {
    id: 19,
    type: 'img',
    src: './grey-shape.png'
  },
  {
    id: 14,
    type: 'img',
    src: './door-1.png'
  },
  {
    id: 15,
    type: 'img',
    src: './door-2.png'
  },
  {
    id: 16,
    type: 'img',
    src: './door-3.png'
  },
  {
    id: 30,
    type: 'img',
    src: './material-1.png'
  },
  {
    id: 31,
    type: 'img',
    src: './material-2.png'
  },
  {
    id: 18,
    type: 'img',
    src: './green-shape.png'
  },
  {
    id: 32,
    type: 'img',
    src: './material-3.png'
  },
  {
    id: 36,
    type: 'img',
    src: './metline-castellated.png'
  },
  {
    id: 48,
    type: 'img',
    src: './tri-clad-old.png'
  },
  {
    id: 49,
    type: 'img',
    src: './zig-zag.png'
  },
  {
    id: 33,
    type: 'img',
    src: './medium-black-horizontal.png'
  },
  {
    id: 34,
    type: 'img',
    src: './medium-line-1-horizontal.png'
  },
  {
    id: 35,
    type: 'img',
    src: './medium-line-2-horizontal.png'
  },
  {
    id: 39,
    type: 'img',
    src: './strong-black-1-horizontal.png'
  },
  {
    id: 40,
    type: 'img',
    src: './strong-black-2-horizontal.png'
  },
  {
    id: 41,
    type: 'img',
    src: './strong-black-horizontal.png'
  },
  {
    id: 42,
    type: 'img',
    src: './strong-blue-horizontal.png'
  },
  {
    id: 43,
    type: 'img',
    src: './strong-orange-horizontal.png'
  },
  {
    id: 44,
    type: 'img',
    src: './thin-arrow-horizontal.png'
  },
  {
    id: 45,
    type: 'img',
    src: './thin-black-horizontal.png'
  },
  {
    id: 46,
    type: 'img',
    src: './thin-circle-horizontal.png'
  },
  {
    id: 22,
    type: 'img',
    src: './item-1.png'
  },
  {
    id: 23,
    type: 'img',
    src: './item-2.png'
  },
  {
    id: 24,
    type: 'img',
    src: './item-3.png'
  },
  {
    id: 25,
    type: 'img',
    src: './item-4.png'
  },
  {
    id: 26,
    type: 'img',
    src: './item-5.png'
  },
  {
    id: 27,
    type: 'img',
    src: './item-6.png'
  },
  {
    id: 28,
    type: 'img',
    src: './item-7.png'
  },
  {
    id: 29,
    type: 'img',
    src: './item-8.png'
  }
];

export default sitePlanData;
