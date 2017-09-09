# paging

>  分页UI组件

## 使用方法

# 实例化的时候，传入容器节点

```
var El = document.getElementById('box');
var dp = new paging(El);
```

#有三个参数

>index 总页数  默认是一页

>thisdata 当前所在页数  默认是第一页

>fn:回调函数，反回值当前页码

>三个参数可以填可以不填，不填就是默认

```
dp.init({
    index:20,
    thisdata:7,
    fn:function (e){
        console.log(e)
    }
});
```

