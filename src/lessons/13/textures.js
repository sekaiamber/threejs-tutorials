import m1 from './textures/matcaps/1.png';
import m2 from './textures/matcaps/2.png';
import m3 from './textures/matcaps/3.png';
import m4 from './textures/matcaps/4.png';
import m5 from './textures/matcaps/5.png';
import m6 from './textures/matcaps/6.png';
import m7 from './textures/matcaps/7.png';
import m8 from './textures/matcaps/8.png';

const RESOURCE_NAMES = {
  matcaps: {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
  },
};

const RESOURCE_FILES = {
  matcaps: {
    [RESOURCE_NAMES.matcaps[1]]: m1,
    [RESOURCE_NAMES.matcaps[2]]: m2,
    [RESOURCE_NAMES.matcaps[3]]: m3,
    [RESOURCE_NAMES.matcaps[4]]: m4,
    [RESOURCE_NAMES.matcaps[5]]: m5,
    [RESOURCE_NAMES.matcaps[6]]: m6,
    [RESOURCE_NAMES.matcaps[7]]: m7,
    [RESOURCE_NAMES.matcaps[8]]: m8,
  },
};

export {
  RESOURCE_NAMES,
  RESOURCE_FILES,
};
