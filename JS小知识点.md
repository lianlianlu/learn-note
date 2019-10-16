## 数据类型

- **js从左向右计算表达式。 不同的次序会产生不同的结果：**

```javascript
var x = 'lianlian' + 1 + 2; //lianlian12
var y = 1 + 2 + 'lianlian'; //3lianlian 
```

---

## 判断语句

- **switch-break if-else **

  > 比如说a=0的判断，switch和if在cpu上面的处理方式是不一样的，switch是在编译阶段将子函数的地址和判断条件绑定了，只要直接将a的直接映射到子函数地址去执行就可以了，但是if处理起来就不一样了。
  >
  > 它首先要把a的值放到CPU的寄存器中，然后要把比较的值放到CPU的另一个寄存器中，然后做减法，然后根据计算结果跳转到子函数去执行，这样一来就要多出3步的操作了，如果逻辑判断多的话，那么将会比switch多处许多倍的操作，尽管寄存器操作的速度很快，但是对于当时的学习机来说，这点速度根本不够用啊。

**记录一下这个问题的解决方案**

```javascript
<select class="form-control"
ng-init="vm.columnId = vm.columnList[0].id"
ng-model="vm.columnId"
ng-change="vm.changeColumn(vm.columnId)"
ng-options="item.id as item.name for item in vm.columnList"
>
  </select>
```

