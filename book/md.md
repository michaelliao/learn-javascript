- Hadoop 0.20.2, 020.203, 020.204, 0.20.205, 1.0.0, 1.0.1, or 0.23.0, 0.23.1 -http://hadoop.apache.org/common/releases.html(可以指定HADOOP_HOME,使得Pig 在不同版本的Hadoop上运行)。如果不指定HADOOP_HOME，Pig 将会在

- Hadoop 0.20.2, 020.203, 020.204, 0.20.205, 1.0.0, 1.0.1, or 0.23.0, 0.23.1 -http://hadoop.apache.org/common/releases.html(可以指定HADOOPHOME,使得Pig 在不同版本的Hadoop上运行)。如果不指定HADOOPHOME，Pig 将会在


#  特殊符号转换
AT@T

AT&amp;T

Markdown 让你可以自然地书写字符，需要转换的由它来处理好了
AT&T

http://images.google.com/images?num=30&amp;q=larry+bird

&copy;

4 < 5

4 &lt; 5

# 区块元素  
 
## 段落和换行

一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行
  
## 标题
类 Setext 和类 atx 形式

类 Setext 形式是用底线的形式，利用 = （最高阶标题）和 - （第二阶标题），例如：

This is an H1
==

This is an H2
--

类 Atx 形式则是在行首插入 1 到 6 个 # ，
# 这是 H1
## 这是 H2

## 区块引用 Blockquotes
使用类似 email 中用 > 的引用方式。
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

区块引用可以嵌套（例如：引用内的引用），只要根据层次加上不同数量的 > ：
> This is the first level of quoting.
>
> > This is nested blockquote.

引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等：
> ## 这是一个标题。
> 
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     return shell_exec("echo $input | $markdown_script");

## 列表

无序列表使用星号、加号或是减号作为列表标记：
*   Red
*   Green
*   Blue
+   Red
+   Green
+   Blue
-   Red
-   Green
-   Blue

有序列表则使用数字接着一个英文句点：
1.  Bird
2.  McHale
3.  Parish

好像完全不用在意数字的准确性
3. Bird
1. McHale
8. Parish

 
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.

如果列表项目间用空行分开，在输出 HTML 时 Markdown 就会将项目内容用 <p> 标签包起来，举例来说：
*   Bird
*   Magic
会被转换为：

列表项目可以包含多个段落，每个项目下的段落都必须缩进 4 个空格或是 1 个制表符：

如果你每行都有缩进，看起来会看好很多，当然，再次地，如果你很懒惰，Markdown 也允许：

*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.

如果要在列表项目内放进引用，那 > 就需要缩进：

*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.
如果要放代码区块的话，该区块就需要缩进两次，也就是 8 个空格或是 2 个制表符：

*   一列表项包含一个列表区块：

                   <代码写在这hello world> 

## BUG
当然，项目列表很可能会不小心产生，像是下面这样的写法：
1986. What a great season.
换句话说，也就是在行首出现数字-句点-空白，要避免这样的状况，你可以在句点前面加上反斜杠。

1986\. What a great season.

# 代码区块||4 个空格或是 1 个制表符
要在 Markdown 中建立代码区块很简单，只要简单地缩进 4 个空格或是 1 个制表符就可以，例如，下面的输入：

这是一个普通段落：
    这是一个代码区块。
这个每行一阶的缩进（4 个空格或是 1 个制表符），都会被移除，例如：

Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell
### 代码区块里的符号&、>、<都会被自动转换
    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

代码区块中，一般的 Markdown语法不会被转换，像是星号便只是星号，这表示你可以很容易地以 Markdown 语法撰写 Markdown 语法相关的文件。



# 分隔线

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线

***
---
___

# 链接
Markdown 支持两种形式的链接语法： 行内式和参考式两种形式。
不管是哪一种，链接文字都是用 [方括号] 来标记。

行内式的链接，只要在方块括号后面紧接着圆括号并插入网址链接即可

This is [an example](http://example.com/ "Title") inline link.

如果你是要链接到同样主机的资源，你可以使用相对路径:  
See my [About](/about/) page for details.   

参考式的链接是在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记：  
This is [an example][id]reference-style link.  
接着，在文件的任意处，你可以把这个标记的链接内容定义出来：  
[id]: http://example.com/  "Optional Title Here"

链接辨别标签可以有字母、数字、空白和标点符号，但是并不区分大小写，因此下面两个链接是一样的：

[link text][a]
[link text][A]
隐式链接标记功能让你可以省略指定链接标记，这种情形下，链接标记会视为等同于链接文字，要用隐式链接标记只要在链接文字后面加上一个空的方括号，如果你要让 "Google" 链接到 google.com，你可以简化成：

[Google][]
然后定义链接内容：   

[Google]: http://google.com/

链接的定义可以放在文件中的任何一个地方，我比较偏好直接放在链接出现段落的后面，你也可以把它放在文件最后面，就像是注解一样。
http://hadoop.apache.org/common/releases.html  
I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3].

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"

如果改成用链接名称的方式写：   
I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"
  
# 强调

星号（*）和底线（_）作为标记强调字词的符号   
*single asterisks*   
_single underscores_  
un *frigging* believable  
\*this text is surrounded by literal asterisks\*

# 代码 `XXXX`
Use the `printf()` function.

如果要在代码区段内插入反引号，你可以用多个反引号来开启和结束代码区段：

``There is a literal backtick (`) here.``
代码区段的起始和结束端都可以放入一个空白，起始端后面一个，结束端前面一个，这样你就可以在区段的一开始就插入反引号：

A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``

在代码区段内，& 和尖括号都会被自动地转成 HTML 实体，这使得插入 HTML 原始码变得很容易，Markdown 会把下面这段：

Please don't use any `<blink>` tags.  
`&#8212;` is the decimal-encoded equivalent of `&mdash;`.

# 图片
行内式的图片语法看起来像是：   
![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")   
详细叙述如下：  
  * 一个惊叹号 !  
  * 接着一个方括号，里面放上图片的替代文字   
  * 接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上 选择性的 'title' 文字。
  
参考式的图片语法则长得像这样：

![Alt text][id]   
「id」是图片参考的名称，图片参考的定义方式则和连结参考一样：

[id]: url/to/image  "Optional title attribute"

# 其它

自动链接  
只要是用尖括号包起来， Markdown 就会自动把它转成链接
<http://example.com/>  
<address@example.com>

反斜杠

Markdown 可以利用反斜杠来插入一些在语法中有其它意义的符号，例如：如果你想要用星号加在文字旁边的方式来做出强调效果（但不用 <em> 标签），你可以在星号的前面加上反斜杠：

\*literal asterisks\*