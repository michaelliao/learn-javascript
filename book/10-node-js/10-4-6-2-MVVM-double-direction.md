
单向绑定非常简单，就是把Model绑定到View，当我们用JavaScript代码更新Model时，View就会自动更新。
有单向绑定，就有双向绑定。如果用户更新了View，Model的数据也自动被更新了，这种情况就是双向绑定。
什么情况下用户可以更新View呢？填写表单就是一个最直接的例子。当用户填写表单时，View的状态就被更新了，如果此时MVVM框架可以自动更新Model的状态，那就相当于我们把Model和View做了双向绑定：

![](\img\mvvm-2way-binding.png)

在浏览器中，当用户修改了表单的内容时，我们绑定的Model会自动更新：

![](\img\mvvm-form.png)

在Vue中，使用双向绑定非常容易，我们仍然先创建一个VM实例：
```
$(function () {
    var vm = new Vue({
        el: '#vm',
        data: {
            email: '',
            name: ''
        }
    });
    window.vm = vm;
});
```

然后，编写一个HTML FORM表单，并用v-model指令把某个<input>和Model的某个属性作双向绑定：

```
<form id="vm" action="#">
    <p><input v-model="email"></p>
    <p><input v-model="name"></p>
</form>
```

我们可以在表单中输入内容，然后在浏览器console中用 window.vm.$data 查看Model的内容，也可以用window.vm.name查看Model的name属性，它的值和FORM表单对应的<input>是一致的。

如果在浏览器console中用JavaScript更新Model，例如，执行window.vm.name='Bob'，表单对应的<input>内容就会立刻更新。

除了<input type="text">可以和字符串类型的属性绑定外，其他类型的<input>也可以和相应数据类型绑定：

多个checkbox可以和数组绑定：
```
<label><input type="checkbox" v-model="language" value="zh"> Chinese</label>
<label><input type="checkbox" v-model="language" value="en"> English</label>
<label><input type="checkbox" v-model="language" value="fr"> French</label>
```
对应的Model为：
```
language: ['zh', 'en']
```

单个checkbox可以和boolean类型变量绑定：
```
<input type="checkbox" v-model="subscribe">
```
对应的Model为：
```
subscribe: true; // 根据checkbox是否选中为true/false
```

下拉框<select>绑定的是字符串，但是要注意，绑定的是value而非用户看到的文本：
```
<select v-model="city">
    <option value="bj">Beijing</option>
    <option value="sh">Shanghai</option>
    <option value="gz">Guangzhou</option>
</select>
```

对应的Model为：
```
city: 'bj' // 对应option的value
```

## 双向绑定最大的好处是我们不再需要用jQuery去查询表单的状态，而是直接获得了用JavaScript对象表示的Model。

## 处理事件

当用户提交表单时，传统的做法是响应onsubmit事件，用jQuery获取表单内容，检查输入是否有效，最后提交表单，或者用AJAX提交表单。

现在，获取表单内容已经不需要了，因为双向绑定直接让我们获得了表单内容，并且获得了合适的数据类型。

- 响应onsubmit事件也可以放到VM中。我们在<form>元素上使用指令：

```
<form id="vm" v-on:submit.prevent="register">
```

其中，v-on:submit="register"  指令就会自动监听表单的submit事件，并调用register方法处理该事件。使用.prevent表示阻止事件冒泡，这样，浏览器不再处理<form>的submit事件。

因为我们指定了事件处理函数是register，所以需要在创建VM时添加一个register函数：

```
var vm = new Vue({
    el: '#vm',
    data: {
        ...
    },
    methods: {
        register: function () {
            // 显示JSON格式的Model:
            alert(JSON.stringify(this.$data));
            // TODO: AJAX POST...
        }
    }
});
```

在register()函数内部，我们可以用AJAX把JSON格式的Model发送给服务器，就完成了用户注册的功能。

使用CSS修饰后的页面效果如下：

![](\img\mvvm-form2.jpg)

参考源码
form-vue