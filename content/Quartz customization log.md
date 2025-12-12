---
title: Quartz customization log
tags:
  - Гайд
  - Quartz
description: 
publish: 
date: ""
---
> Тут вы найдёте, то как я кастомизировал данный сайт под свои задачи. Что-то было разработано мной, но большая часть взята из открытых источниках, а именно Discord или у других пользователей коммьюнити Obsidian. Вот [[Quartz Showcases|тут]] можно найти сайты у которых я брал вдохновение или код). [Discrod](https://discord.com/invite/cRFFHYye7t) коммьюнити, где тоже очень много полезного. Отдельный гайд, как запустить свою первую страницу вот [[Как создать сайт с помощью Quartz & Obsidian|здесь]]. 


### Первые шаги 
##### 1. Изменить `quartz.config.ts`
- BaseUrl - kirill-cameover.github.io/blog
```ts
baseUrl: "kirill-cameover.github.io/blog",
```
- Title - название, заголовок сайта 
```ts
pageTitle: "Kirill Cholak",
```
- Язык 
```ts
locale: "ru-RU",
```
- Типография
```ts
typography: {
header: "Noto Sans",
body: "Roboto",
code: "IBM Plex Mono",
```
- Цвета темы: 
	Было: 
```ts
colors: {
lightMode: {
light: "#faf8f8",
lightgray: "#e5e5e5",
gray: "#b8b8b8",
darkgray: "#4e4e4e",
dark: "#2b2b2b",
secondary: "#284b63",
tertiary: "#84a59d",
highlight: "rgba(143, 159, 169, 0.15)",
textHighlight: "#fff23688",
},
darkMode: {
light: "#161618",
lightgray: "#393639",
gray: "#646464",
darkgray: "#d4d4d4",
dark: "#ebebec",
secondary: "#7b97aa",
tertiary: "#84a59d",
highlight: "rgba(143, 159, 169, 0.15)",
textHighlight: "#b3aa0288",
```

- [ ] Cтало: 
```
Пока не изменил
```

- [ ] Нужно будет ещё изменить Аналитику
Было: 
```ts
analytics: {
provider: "plausible",
},
```
Стало 
```
Пока не изменил
```

- Изменить Favicon & Page banner
Нужна папка `quartz/static/`

Заменить картинки на свои с такими же названиями: 
- [x] `icon.png` - favicon 
- [ ]  `og-image.png` -  banner картинка, которая появляется при отправке или в поиске 
##### 2. Изменить `quartz.layout.ts`
Тут я изменил расположение элементов на странице и создал ещё дополнительный элемент Links 
- Footer - изменить ссылки и название на свои. 
```ts
footer: Component.Footer({
links: {
"Telegram": "https://t.me/kirillciolac",
},
```
- Left - расположение элементов слева, без изменений 
```ts 
left: [
	Component.PageTitle(),
	Component.MobileOnly(Component.Spacer()),
	Component.Flex({
	components: [
			{
			Component: Component.Search(),
			grow: true,
			},
			{ Component: Component.Darkmode() },
			{ Component: Component.ReaderMode() },
		],
	}),
	Component.Explorer(),
],
```
- Right - Удалил Граф, бэклинки и Explorer - мне они кажутся лишними. Оставил только Оглавление "TableOfContents" - только десктоп. 
```ts 
right: [
// Component.Graph(),
// Component.Explorer(),
Component.DesktopOnly(Component.TableOfContents()),
// Component.Backlinks(),
],
```
- Header - Добавил новый элемент Links - это по факту быстрые ссылки на важные страницы, чтобы было доступно всегда 
```ts 
header: [
// Component.PageTitle(),
Component.Links(),
],
```

##### 3. Создание своих компонентов
- Links - Это компонент, который содержит в себе фиксированные ссылки на важные по моему мнению страницы. Я его использую в качестве меню в Headers в классическом понимании. 
Что нужно сделать: 
	1. Создать файл в `quartz/componets/` - Links.tsx

```tsx title="Links.tsx"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/links.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"

interface Options {
  title: string
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  title: "",
})

export default ((userOpts?: Partial<Options>) => {
  function Links({ allFiles, fileData, displayClass, cfg }: QuartzComponentProps) {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    return (
      <div class={`links ${displayClass ?? ""}`}>
        <h3>{opts.title}</h3>
        <ul>
          <li>
            <h3 style={{marginTop: 0, marginBottom: 0}}><a href="/me">Обо мне</a></h3>
          </li>
          <li>
            <h3 style={{marginTop: 0, marginBottom: 0}}><a href="/life">Гайды</a></h3>
          </li>
          <li>
            <h3 style={{marginTop: 0, marginBottom: 0}}><a href="/posts">Посты</a></h3>
          </li>
          <li>
            <h3 style={{marginTop: 0, marginBottom: 0}}><a href="/projects">Проекты</a></h3>
          </li>
        </ul>
      </div>
    )
  }

  Links.css = style
  return Links
}) satisfies QuartzComponentConstructor
```

2. Создать файл в `quartz/componets/styles` - links.scss

```scss title="links.scss"
.links {
  ul {
    list-style: none;
    margin-top: 1rem;
    padding-left: 0;

    display: flex;           /* make items horizontal */
    flex-wrap: wrap;         /* wrap on smaller screens */
    gap: 1rem;               /* space between items */
    align-items: center;     

    & > li {
      margin: 0;             /* remove vertical margin */
      /* keep link visuals compact */
      .section > .desc > h3 > a {
        background-color: transparent;
      }

      .section > .meta {
        margin: 0 0 0.5rem 0;
        opacity: 0.6;
      }

      /* optional: make the H3 inline so it doesn't force vertical spacing */
      h2 {
        margin: 0;
        font-weight: 600;
      }
    }
  }
}
```

3. Добавить новый компонент в `quartz.layout.ts` 
- `Component.Links(),` 

##### Убрать даты и другие данные со страницы индексирование(главная страница) 

- Было: 
```tsx title="ContentMeta.tsx"
import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates) {
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
```

- Стало: 

```tsx title="ContentMeta.tsx"
import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    // Don't show metadata for index page
    if (fileData.slug === "index") {
      return null
    }
    const text = fileData.text
    if (text) {
      const segments: (string | JSX.Element)[] = []
      if (fileData.dates) {
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
      }
      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }
      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
```

