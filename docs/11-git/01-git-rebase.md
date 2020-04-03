# git rebase

`rebase`:顾名思义 **==变基==**

假设现在从`master` 分支上,切出一个本地开发分支`mydev`

```sh
git checkout -b mydev
```

这时候`master`上的`git`记录是这样子的

```sh
A-->B-->C-->D
```

这个时候另外一个开发人员把 ta 的 dev 分支合并到 master 分支了
`tadev`

```js
A-->B-->C-->D
            |-->E-->F-->G
```

- 查看 git 记录

```js
git lg or git log
```

实际上现在`master`上的分支的 git 提交记录已经是这样子的了：

```js
A-- > B-- > C-- > D-- > E-- > F-- > G;
```

但是你本地上的分支还是这样的，你分别了提交了 3 个 `commit`记录。

```js
            |—->M-->N-->O
A-->B-->C-->D

```

这时，你的代码开发完成了，需要合并代码。这时候有两种选择：

直接

```js
git merge
```

或者

```js
 经过 git rebase  再提交 git merge
```

## merge

如果直接`git merge`,假设你提交`commit`的时间和刚才合并进去的其他人的 dev 分支是有重合的：

```js
A-->B-->C-->D
            |-->E       |-->F-->G
                |-->M-->N       |-->O
```

这样的提交的记录就比较乱，假设现在需要回退代码什么的，就有点小麻烦了，就需要一个文件去回退。对于多人协作的话 就比较需要`git rebase`

## rebase

先对`mydev`分支进行 `git rebase` 操作

这时候分支的提交记录就会变为如下所示：

```js
A-->B-->C-->D-->E-->F-->G
                        |-->M-->N-->O
```

会把`mydev`分支新增的`commit`记录新增在 master 分支最新的后面，这个时候`push`分支，就需要强制更新你的分支。再提交`merge`。

```js
git push -f
```

变基的作用就是修整历史，将分支历史并入主线。

## git rebase 注意事项

- 确保没有其它分支同时更改同一个文件
- `git rebase`前需要确保`master`分支为最新。
- 变基会修整历史，然后将分支历史并入主线，可以理解成美化过的历史，而合并则可以不修改历史，让分支历史依然独立存在，可以看作原始的历史。
- 永远不要对已经推到主干分支服务器或者团队其他成员的提交进行变基，我们选择变基还是合并的范围应该在自己当前工作范围内。
- 如果`git rebase`之后提示冲突的话，需要解决冲突：

  - 解决冲突后 add 更改的文件

  ```js
  git add
  ```

  - 无需 `commit`, 继续 `rebase`

  ```js
  git rebase --continue
  ```

  `git rebase`还有一些其他的操作，

- 放弃`git rebase`

```js
git rebase --abort
```

- 压缩最近几次提交

```js
git rebase -i HEAD~4 合并最近4次提交
```

> <http://blog.codingplayboy.com/2017/04/14/git_rebase/>
