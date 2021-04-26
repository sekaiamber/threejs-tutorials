# 名称

- Scene: 场景
- Mesh: 网格，承载几何体和材质的单位
- Geometry: 几何体，描述对象的形状
- Material: 材质，描述对象如何被绘制
- Camera: 相机
- Renderer: 渲染器，将场景渲染到指定的容器中，场景代表了数据，渲染器将进行具体的底层绘制

## Camera

- PerspectiveCamera: 透视相机，最常见的近大远小模拟人眼的相机

## Geometry

- vertices: 顶点
- faces: 面

内置各类型：

- BoxGeometry: 立方体
- PlaneGeometry: 平面
- CircleGeometry: 圆平面（由三角形模拟）
- ConeGeometry: 椎体
- CylinderGeometry: 柱体
- RingGeometry: 圆环平面（由三角形模拟）
- TorusGeometry: 圆环（类似甜甜圈）
- TorusKnotGeometry: 扭曲圆环（类似无限符号）
- DodecahedronGeometry: 十二面体，和类十二面体（通过detail）
- OctahedronGeometry: 八面体，和类八面体（通过detail）
- TetrahedronGeometry: 四面体，和类四面体（通过detail）
- IcosahedronGeometry: 二十面体，和类二十面体（通过detail）
- SphereGeometry: 球体
- ShapeGeometry: 形状平面
- TubeGeometry: 管道
- ExtrudeGeometry: 拉伸几何体（有点像锤子头）
- LatheGeometry: 车削平面（瓦片型，转一圈可以变成碗型）
- TextGeometry: 3D文字

