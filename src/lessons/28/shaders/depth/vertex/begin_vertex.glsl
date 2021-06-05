#include <begin_vertex>

// depth没有在beginnormal_vertex中声明变量
float angle = (transformed.y + uTime) * 0.9;
mat2 rotateMatrix = get2dRotateMatrix(angle);

transformed.xz = rotateMatrix * transformed.xz;
