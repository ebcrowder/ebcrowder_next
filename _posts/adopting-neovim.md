---
date: "2022-03-01"
title: "Adopting Neovim as my primary editor"
tags: ["Neovim", "Vim", "Linux"]
---

I love Vim.

I have been using Vim on my personal machine for a number of years now. Learning the Vim "language" makes me approach programming in a very specific way. The way I navigate files, read code, review pull requests, make edits, etc. has been entirely influenced by Vim's editing paradigm. 

It is truly a wonderful tool. I am so glad that I decided to try _:vimtutor_ that one fateful evening! I was forever hooked.

However, at work, I have historically used JetBrains editors with the [IdeaVim](https://github.com/JetBrains/ideavim) plugin. Throughout this time, I have mostly been satisfied with the experience but as impressive as the JetBrains Vim emulation is, the end result is a bit lacking compared to native Vim. So, given the fact that my work tools "just work", I never felt I needed to spend time making Vim fit into my development environment.  

That is until I rediscovered the [Neovim](https://neovim.io) project. With the relatively recent 0.5 release in 2021, Neovim ships with a [LSP](https://langserver.org) server integration, making it as extensible as say, VSCode. Neovim maintains almost all of Vim's features and includes sensible defaults, so it is a very interesting project and seems to have a very enthusiastic community behind it. After spending some time reading blog posts and watching countless YouTube videos, I decided to give Neovim a try. 

The following narrative details how I accomplished setting up Neovim from scratch to serve as my development environment.

## Methodology

Here is the methodology of how I approached setting up Neovim:
- I primarily use JavaScript/TypeScript at work. Getting Neovim working with the TypeScript language server, ESLint and Prettier is paramount.
- When possible, use Neovim official projects and/or features over other plugins (e.g. LSP over [coc.nvim](https://github.com/neoclide/coc.nvim) for language support, etc)
- Keep things as minimal as possible and do not change defaults unless absolutely necessary.
- Figure out a way to replicate IDE features that I regularly use, such as debugging and HTTP client for sending requests.
- (bonus) Figure out a way to make working in the terminal more ergonomic.

# Neovim setup

## init.lua

Since I was starting from scratch, I decided to scrap my existing _.vimrc_ and start new. Neovim allows you to write config files in [Lua](https://www.lua.org/), which is a language that is heavily utilized in the Neovim codebase and is exposed for developers to use to author plugins, make upstream contributions. Lua is a lot easier to read than Vimscript. So, since the project seems to push Lua, I decided to look for idiomatic example config files expressed entirely in that way.

Luckily I found exactly what I was looking for in [kickstart.vim](https://github.com/nvim-lua/kickstart.nvim), which is referenced in the Neovim official documentation. 

The config has all of the Neovim official bells and whistles - LSP, Telescope and Treesitter. It even has a very helpful set of plugins (such as _tpope/vim-fugitive_) that most Vim users have in their setups.  

It even has tsserver set up as a default language server. I had a working Neovim setup minutes after linking this file in my system. I was off to a good start!

## Plugins

While _kickstart.vim_ ships with just enough plugins to get you started, I did make some substitutions with comparable plugins that I was already familiar with. Here are a few highlights:

- A few [Tim Pope](https://github.com/tpope) plugins are necessary. This includes _vim-fugitive_, _vim-commentary_, _vim-repeat_ and _vim-surround_ - all of which are so ubiquitous they might as well be in upstream Vim. I also like _vim-vinegar_ and _vim-unimpaired_.
- [Kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim) theme. It is sort of a cross between the [Gruvbox](https://github.com/morhetz/gruvbox) and [Tokyonight](https://github.com/folke/tokyonight.nvim) themes.

# Terminal tools and utilities

## kitty

Throughout this exploration process, it became apparent to me that Neovim users typically do not use the terminal emulator that ships with their operating system. Instead, a number of modern cross-platform choices are available. Of these, [kitty](https://github.com/kovidgoyal/kitty) spoke to me the most. Here are a few reasons why:
- the [documentation](https://sw.kovidgoyal.net/kitty/) is excellent and searchable. Finding keyboard shortcuts, examples and settings to tweak is very easy.
- kitty aims to be a feature-rich terminal, including window tiling and tabs. Typically Vim users use [tmux](https://github.com/tmux/tmux) for tiling and window management, but kitty makes these features first-class and maps the controls to intuitive key controls. This eliminates the need for a terminal multiplexer. As a point of reference, my [config](https://github.com/ebcrowder/dotfiles/blob/main/.config/kitty/kitty.conf) is less than 5 lines long. I simply found no reason to move away from the defaults. They are quite good. 
- I can use kitty on my work machine (macOS) and my personal machine (Linux). This allows me to have consistent environments across machines.

As a bonus - kitty is really, really fast. It uses [GPU rendering](https://sw.kovidgoyal.net/kitty/performance/), which seems to be a common trait among modern terminal emulator projects. This makes for a smooth terminal experience, which is very important for Vim users.

## httpie

For http requests, I historically have used the JetBrains integrated http [client](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html), which is very powerful. In particular, it has a nice way of storing credentials, allows you to diff responses and convert commands from the http client syntax to _curl_. I used this tool every day so finding a replacement seemed prudent.

Enter the [httpie](https://httpie.io) CLI. It is a front-end for _curl_. I found their docs to be very thorough. Ultimately, it makes working with _curl_ significantly easier. For example, working with requests that contain JSON payloads is significantly easier.

You can pipe in JSON and credentials from a file when making requests which keeps the CLI interface nice and short.  

## fzf

[fzf](https://github.com/junegunn/fzf) was a tool that I never realized I needed until I used it. In particular, I installed the bash completions and keybindings that it ships with, which provide the `CTRL-T` and `CTRL-R` shortcuts.

In short, `CTRL-T` will allow you to fuzzy find a particular path on your system with a keyword. This means you do not have to traverse the entire path. I often use this when changing directories, e.g. `cd`, then `CTRL-T` to search for the full path, then hit `Enter`.

`CTRL-R` allows you to search your bash command history. 

fzf does have a widely-used [plugin](https://github.com/junegunn/fzf.vim) for Vim/Neovim, but I opted to use [Telescope](https://github.com/nvim-telescope/telescope.nvim) instead, since it is maintained by the Neovim community.

Ultimately, I find that fzf replicates the most useful functionality of shell prompts, such as [ohmyzsh](https://ohmyz.sh/) and [starship.rs](https://starship.rs/).

## Debugging

With JetBrains tools, I debugged applications using the bundled integrated debugger client. I utilized this tool on a daily basis, so finding a suitable alternative was important.

I eventually learned that Chromium-based browsers ship with a Node debugger client! See [here](https://ebcrowder.dev/posts/remote-debugging-with-chrome) for how I set this up for remote debugging.

There are some interesting plugins that integrate a debugger client into Neovim, such as [nvim-dap](https://github.com/mfussenegger/nvim-dap). It is fairly low-level and requires a few additional plugins to be useful (such as a user interface), so I skipped exploring it further.

### References
- My [dotfiles](https://github.com/ebcrowder/dotfiles)
- [kickstart.vim](https://github.com/nvim-lua/kickstart.nvim)
- [Neovim](https://neovim.io/)
- [kitty](https://github.com/kovidgoyal/kitty)
- [fzf](https://github.com/junegunn/fzf) 
- [httpie](https://httpie.io)
