# Shader

## 坐标系统

[这篇文章](https://learnopengl.com/Getting-started/Coordinate-Systems)详细说明了OpenGL下的坐标系统，WebGL也差不多。

总体而言总共有5个空间：

* 本地空间：模型自己的空间。
* 世界空间：本地空间通过模型矩阵，映射到世界坐标。
* 视点空间：世界空间通过视点矩阵，映射到视点坐标。
* 裁剪空间：视点空间通过投影矩阵，映射到裁剪坐标。
* 屏幕空间：裁剪空间通过视点转化，转化为2D图像。

所以要获得裁剪坐标，公式为：
```
V(clip) = M(projection) * M(view) * M(model) * V(local)
```

此公式中的矩阵顺序不能变，因为矩阵点乘运算不满足交换律。


