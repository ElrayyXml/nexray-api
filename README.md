[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

<div align="center">

### @nexray/api

</div>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

<div align="center">

<p><em>Api NexRay</em></p>

<img src="https://files.catbox.moe/7m4cuw.jpg" width="300" alt="Cover Banner" />

</div>

---

#### Installation
Use the stable version:
```bash
npm install @nexray/api
# or
yarn add @nexray/api
```

#### package.json

```json
"dependencies": {
  "@nexray/api": "latest"
}
```

#### Example

## Request
```ts
const nexray = require('@nexray/api');

const data = await nexray.get('/ai/gemini', {
              text: 'Halo apa kabar...'
              }
       );
       
       console.log(data)
```

## Response
```json
{
  "status": true,
  "author": "NexRay",
  "result": "Halo! Kabar saya baik, terima kasih telah bertanya. Ada yang bisa saya bantu hari ini?"
}
```
