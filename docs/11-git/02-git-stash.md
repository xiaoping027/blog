# git stash

`stash`：储藏

`git stash`的使用场景： 当前分支下的某几个文件，前面的修改部分已经放在暂存区，目前在工作区还在进行修改，如果此时需要在当前文件下进行紧急修复 bug，就需要把工作区正在修改的文件 `stash` 暂存起来，进行 `bug` 修复工作，在完成 `bug` 修复工作后，提交 `commit`，将暂存的工作区文件内容拿出来继续.

## stash

`git stash save "save message"`: 执行存储时，添加备注，方便查找，只有 git stash 也要可以的，但查找时不方便识别。

## git stash list

查看 `stash` 哪些存储

## git stash show

显示做了哪些改动，默认 `show` 第一个存储,如果要显示其他存贮，后面加 `stash@{\$num}`，比如第二个 `git stash show stash@{1}`

## git stash show -p

显示第一个存储的改动，如果想显示其他存存储，命令：`git stash show stash@{\$num} -p` ，比如第二个：`git stash show stash@{1} -p`

## git stash apply

应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即 `stash@{0}`，如果要使用其他个，`git stash apply stash@{\$num}` ， 比如第二个：`git stash apply stash@{1}`

## git stash pop

命令恢复之前缓存的工作目录，将缓存堆栈中的对应 `stash` 删除，并将对应修改应用到当前的工作目录下,默认为第一个 `stash`,即 `stash@{0}`，如果要应用并删除其他 `stash`，命令：`git stash pop stash@{\$num}` ，比如应用并删除第二个：`git stash pop stash@{1}`

`git stash pop` 功能与 `git stash apply` 大致一样，区别如下：

- pop 正如它的名字，将储藏内容弹出并应用，储藏内容会被从储藏列表中删除。
- apply 仅仅是应用，不会将储藏从储藏列表中删除。

## git stash drop stash@{\$num}

丢弃 `stash@{\$num}`存储，从列表中删除这个存储

## git stash clear

删除所有缓存的 `stash`

## git stash branch

可以运行 `git stash branch` 创建一个新分支，检出储藏工作时所在的提交，重新在那应用工作，然后在应用成功后扔掉储藏.

## 注意点

`git add` 只是把文件加到 `git` 版本控制里，并不等于就被 `stash` 起来了，`git add` 和 `git stash` 没有必然的关系，但是执行 `git stash` 能正确存储的前提是文件必须在 `git` 版本控制中才行。
