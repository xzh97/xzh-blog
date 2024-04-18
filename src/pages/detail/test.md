# TS笔记
## TS类型
### ts类型等级
1. any, unknown为顶级类型，包含下面所有类型
2. object
3. Number, String, Boolean为构造函数
4. number string boolean为上面构造函数的实例化对象
5. 1, 'xizh', false
6. never

### any和unknow类型区别

- any为任意类型，`unknown`意指不知道的类型
- unknown类型只能赋值给自身或者any类型
- unknown类型不能读取到任何属性，方法也不能调用

### Object,object和{}

- Object和object Object是和原型链有关的顶层，所以值类型和引用类型最终都指向Object， 所以Object包含所有类型
- object代表所有非值类型，常用于泛型约束
- 对象字面量的方式和Object声明是一样的

### 数组类型
#### 类型[]
```typescript
let arr1: number[] = [1, 2, 3]
let arr2: string[] = ['1', '2']

```

#### 数组泛型
```typescript
let arr1: Array<number> = [1, 2]
let arr2: Array<string> = ['1', '2']
```

#### 接口描述数组
```typescript
interface Item {
    name: string,
    age: number
}

let arr1: Item[] = [{name: 'xizh', age: 25}]
let arr2: Array<Item> =[{name: 'xizh', age: 25}]
```

#### 多维数组
```typescript
let arr1: number[][] = [[1], [2]]
let arr2: Array<Array<number>> = [[1], [2]]
```

#### arguments类数组
```typescript
function foo(...args: string[]) {
    let a: IArguments = arguments
    console.log(arguments);
}
foo('1', '2')

// IArguments是ts中定义好了的类型，实际上就是
interface IArguments {
    [index:number]: any
    length: number
    callee: Function
}
```

### 函数类型
- 参数不能多传，也不能少传。必须按照约定类型来
```typescript
function add(a: number, b: number): number {
    return a + b
}
```

- 可选参数
```typescript
function add(name: string, age?: number): string {
    return name + age
}
```

- 参数默认值
```typescript
function add(name: string = 'default value'): string {
    return name
}
```

- 接口定义函数
```typescript
interface User {
    age: number
    name: string
}

function usera(user: User): User {
    return user
}
```

### never类型
never类型主要是表示不应该存在的状态
```typescript
type nev = string & number // 此时nev变量为never类型

function error(msg: string): never{
    throw new Error(msg)
}
function loop(): never{
    while(true){
        
    }
}
```

#### never和void的区别
- void类型只是没有返回值，但本身不会出错
- never在联合类型中会被直接移除
```typescript
type A = void | number | never // 此时鼠标hover只有void和number类型
```

#### never的应用场景

```typescript
// 由于任何类型都不能赋值给never类型的变量，所以当存在进入default分支的可能性时，ts的类型检查会及时帮我们发现这个问题
type A = 'a' | 'b' | 'c'
function foo(val:A){
    switch(val) {
        case 'a':
            break;
        case 'b':
            break;
        case 'c':
            break;
        default:
            const err:never = val
            return err
    }
}
```

## interface
- interface 重名属性会重合
```typescript
interface A {
    a: string
}
interface A {
    b: num
}
// 相当于
interface A {
    a: string
    b: num
}
```
- interface 任意key
```typescript
// 任意属性 需要注意的地方，一旦定义了任意属性，那么确定属性和可选属性必须是任意属性的类型的子集
interface A {
    a: string
    [propName: string]: any
}
```
- interface readonly
```typescript
// 任意属性 需要注意的地方，一旦定义了任意属性，那么确定属性和可选属性必须是任意属性的类型的子集，例如，任意类型定义为object，就不能给确定属性设置为any
interface A {
    a: string
    readonly b: number
    [propName: string]: any
}
let a: A = {
    b: 123,
    a: '123'
}
a.b = 123 // 编译会报错
```
- interface 接口继承：使用extends关键词
```typescript
interface Ikun extends B {
    name: string
    age?: number
    readonly cb: () => boolean
}

interface B {
    xxx: string
}

let ikun: Ikun = {
    name: 'xizh',
    age: 25,
    gender: 'male',
    xxx: '123'
}
```


- interface 定义函数类型
```typescript
interface Fn {
    (name:string): number[]
}
const fn:Fn = function(name:string){
    return [1]
}
```
- 不能多属性 也不能少属性
```typescript
interface A {
    a: string
    b: num
}
// a,b属性都得有 不然会报错
let a:A = {
    a: 'xxx',
    b: 1
}
```

## 函数重载
函数重载是指方法名字相同，而参数不同，返回类型可以相同也可以不同。

如果参数类型不同，则参数类型应设置为`any`。

参数数量不同可以设置为可选参数

```typescript
let user1: number[] = [1, 2, 3]
function findNum(add: number[]): number[] // 如果传入了add数组就是添加
function findNum(id: number): number[] // 如果传入了id就是单个查询
function findNum(): number[] // 如果没传入id就是查询全部
function findNum(ids?: number | number[]): number[] {
    if (typeof ids == 'number') {
        return user1.filter(v => v == ids)
    }
    else if (Array.isArray(ids)) {
        user1.push(...ids)
        return user1
    }
    else {
        return user1
    }
}
console.log(findNum(3)) // [3]
console.log(findNum()) // [1,2,3]
console.log(findNum([4,5])) // [1,2,3,4,5]
console.log(findNum()) // [1,2,3,4,5]
```

## 联合类型 | 交叉类型 | 类型断言
### 联合类型
```typescript
let phone：number | string = '7758258'
let fn1 = function(type: number | boolean):boolean {
    return !!type
}
```

### 交叉类型
```typescript
interface People {
    name: string
    age: number
}
interface Man {
    gender: string
}

const sayName = (man: People & Man):void => {
    console.log(man)
}
sayName({
    name: 'xizh',
    age: 25,
    gender: 'male'
})
```

### 类型断言
语法：值 as 类型 / <类型>值
```typescript
interface Aa {
    run: string
}

interface Bb {
    build: string
}

let duanyan = (type: Aa | Bb):void => {
    console.log((<Aa>type).run)
    console.log((type as Aa).run)
}
duanyan({
    build: '123'
})
console.log(duanyan)
```
需要注意的是，类型断言只能欺骗ts编译器，无法避免运行时的错误。滥用类型断言可能会导致运行时错误。

## Class
### 定义class
```typescript
class Person {
    // ts中不允许直接在constructor定义变量，需要在constructor上面先声明
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    run():void {
        
    }
}
```
### 修饰符
- public: 定义的变量/方法可以内部访问，也可以外部访问。 不写修饰符默认就是public
```typescript
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
```
- private: 定义的变量/方法只允许内部访问，不可以外部访问
```typescript
class Person {
    name: string
    age: number
    private some: number
    constructor(name: string, age: number, some: any) {
        this.name = name
        this.age = age
        this.some = some
    }
}

let person = new Person('xizh', 25, 1)
person.some // 读取时直接报错


```
- protected：定义的变量/方法可以内部访问及继承的子类访问，不可以外部访问
```typescript
class Person {
    name: string
    age: number
    protected some: number
    constructor(name: string, age: number, some: any) {
        this.name = name
        this.age = age
        this.some = some
    }
    run():void {
        
    }
}
class Man extends Person {
    constructor(name: string, age: number, some: any) {
        super(name, age, some)
    }
    getSome(){
        console.log(this.some)
    }
}


let person = new Person('xizh', 25, 1)
person.some // 读取时直接报错

let man = new Man('xizh', 25, 1)
man.getSome() // 1
```

### 静态属性和方法
- static定义的属性和方法不可以通过this去访问，只能通过类名去调用
```typescript
class Person {
    name: string
    age: number
    static some: any
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    // 需要注意的地方，如果两个函数都是静态的，可以通过this互相调用
    static run1 (){
        console.log('run1')
        this.run2()
    }
    
    static run2 (){
        console.log('run2')
        return 'run2'
    }
}

// 错误调用方法
let person = new Person('xizh', 25, 1)
person.some //报错
person.run1()

// 正确调用方法
Person.some
Person.run1()
```

### interface定义类
```typescript
class Person1 {
    get(type: boolean): boolean
}
class Person2 {
    set(): void
    age: number
}
class A {
    name: string
    constructor() {
        this.name = '123'
    }
}
class Person extends A implements Person1, Person2 {
    age: number
    constructor() {
        super()
        this.age = 26
    }
    get(type:boolean) {
        return type
    }
     set (){
    }
}

```

### abstract class抽象类

```typescript
abstract class VueCls {
    name: string
    constructor(name: string) {
        this.name = name;
    }
    getName(): string {
        return this.name
    }
    abstract getNam(): void
}

// 抽象类无法被实例化
let vm = new VueCls() 

// 抽象类作为一个基类，然后通过继承抽象类去实现基类的一些方法

class React extends VueCls {
    constructor(){
        super('xizh')
    }
    setName(name: string):void {
        this.name = name
    }
    getNam():void{
        console.log(this.name)
    }
}

let react = new React()

react.setName('xizh123')
console.log(react.getName()); // xizh123
```

## 类型推论和类型别名
### 类型推论
当声明一个变量但是没有定义类型时，ts会在没有明确的指定类型时推测出一个类型。

```typescript
let str = 'xizh'; // 自动推断为string
str = 123 // 报错

let any; //自动推断成any类型 
any = 123 // 不报错
any = 'xizh' // 不报错
any = true // 不报错
```

### 类型别名
type关键字（可以给一个类型定义一个名字）多用于复合类型
```typescript
type str = string
let s:str = 'xizh'

type fun = () => string
let foo:fun = () => 'xizh'

// 联合类型别名
type str1 = str | number
let s1:str1 = '123'
let s2:str1 = 123

// 定义值别名
type val = boolean | 0 | 1
let value:val = true //正确
let value2:val = '123' //报错

// 高级用法
type a = 1 extends number ? 1 : 0 // 1
type a = 1 extends Number ? 1 : 0 // 1
type a = 1 extends Object ? 1 : 0 // 1
type a = 1 extends any ? 1 : 0 // 1
type a = 1 extends unknown ? 1 : 0 // 1
type a = 1 extends never ? 1 : 0 // 0,因为never类型在作用域最底层
```

#### type和interface区别
- interface可以继承，type只能通过&交叉类型合并
- type可以定义联合类型以及可以使用一些操作符，interface不行
- interface遇到重名会合并，type不行

## 泛型
### 函数泛型
```typescript
function num(a:number, b:number): Array<number> {
    return [a, b]
}
num(1,2);

function str(a:string, b:string): Array<string> {
    return [a, b]
}
str('xi','zh')

// 利用泛型来优化
function Add<T>(a: T, b: T): Array<T> {
    return [a,b ]
}
Add<number>(1, 2)
Add<string>('xi', 'zh')

// 多类型优化
function Add<T, B>(a: T, b: B): Array<T | B> {
    const res: Array<T | B> = [a, b]
    return res
}
Add<number, string>(1, '2')
Add<string, boolean>('xizh', true)
```

### 定义泛型接口
```typescript
interface MyT<T> {
    (arg: T): T
}

function fn<T>(arg: T) {
    return arg
}

let res: MyT<number> = fn
res(123)

let str12: MyT<string> = fn
str12('123')
```

### 对象字面量泛型
```typescript
let foo: { <T>(arg: T): T}
foo = function<T>(arg: T): T {
    return arg
}

foo(123)
```

### 泛型约束
```typescript
// 原函数 这就要求arg必须要有length属性
function getLen<T>(arg: T) {
    return arg.length
}

interface Len {
    length: number
}

function getLen<T extends Len>(arg: T) {
    return arg.length
}

getLen<string>('123')
```


## template
```typescript

```