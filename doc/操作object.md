# 操作一个object

## Position

Object3D.position返回的通常是`Vector3`类。

此类经常用到的函数如下：

```javascript
const position = new Vector3();
```

属性类：
```javascript
// 获得一个点到(0,0,0)的欧氏距离
position.length();

// 获得一个点到另一个点的距离
position.distanceTo(otherPosition);
```

操作类：
```javascript
// 统一设置xyz
position.set(1, 1, 1);

// 使这个向量变为单位向量，即方向不变，length变为1，即点落在了以(0,0,0)为中心的球面上。
position.normalize();
```

## Scale

Object3D.scale也是`Vector3`类。

## Rotation

Object3D.rotation返回的是`Euler`类。

Euler类也有`x`,`y`,`z`，只不过这3者的数字量是2π为一圈。

旋转要注意万向节锁死（gimbal lock）的问题，主要问题在于，欧拉坐标轴系统，旋转时x，y，z三轴是有层级顺序的。可以看看[这个视频02:30处的演示](https://www.bilibili.com/video/BV1jt411U7nM?from=search&seid=7980492085165892647)来获得解释。

总之就是，当两个坐标轴重合之后，如果需要旋转另一根轴，视觉上的期望是物体只需要旋转一个轴的角度，而因为xyz有顺序关系，所以他会同时变化3个轴的数据，在插值动画时，会表现为物体在非旋转轴外进行了一个诡异的外动又复原的过程。这种坐标轴重合的问题被认为是欧拉坐标轴缺失了一个自由度。

调用`euler.reorder('YXZ')`可以一定程度上解决这个问题，但是只是将重合情况换了轴。

为了解决这个问题，正常情况下使用`Quaternion`四元数来表示旋转角度，四元数和欧拉角可以互相映射，但是四元数的容量比欧拉角大，所以多个四元数能映射到一个欧拉角上，这意味着不同四元数的状态反应出来是同样的三维空间旋转量，但是这可以弥补万向节锁死在插值上的问题。

所以更新四元数是更好的物体旋转方式。




