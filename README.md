[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

<div align="center">

### @nexray/api

</div>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

<div align="center">

<p><em>Api NexRay</em></p>

<img src="https://files.catbox.moe/84up1c.jpg" width="300" alt="Cover Banner" />

</div>

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/@nexray/api.svg)](https://www.npmjs.com/package/@nexray/api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dt/@nexray/api.svg?color=blueviolet&label=Downloads&logo=npm)](https://www.npmjs.com/package/@nexray/api)
[![REST API](https://img.shields.io/badge/REST_API-green.svg)](https://api.nexray.web.id)

</div>

#### Contact

<div align="center">

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/elrayyxml)
[![TikTok](https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://tik-tok.com/@elrayyxml)
[![Email](https://img.shields.io/badge/Email-elrayy68@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:elrayy68@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-6289526377530-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6289526377530)

</div>

#### Official Channel

<div align="center">
  <a href="https://whatsapp.com/channel/0029Vb69z8n1dAvztHQTDu3r">
    <img src="https://img.shields.io/badge/Join-WhatsApp%20Channel-25D366?logo=whatsapp&logoColor=white" alt="WhatsApp Channel" />
  </a>
  
</div>

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

#### Request
```ts
const nexray = require('@nexray/api');
# or
import nexray from '@nexray/api';

const data = await nexray.get('/ai/gemini', {
              text: 'Halo apa kabar...'
              }
       );
       
       console.log(data)
```

#### Response
```json
{
  "status": true,
  "author": "NexRay",
  "result": "Halo! Kabar saya baik, terima kasih telah bertanya. Ada yang bisa saya bantu hari ini?"
}
```

#### Request Buffer
```ts
const nexray = require('@nexray/api');
# or
import nexray from '@nexray/api';

const buffer = await nexray.getBuffee('/maker/brat', {
              text: 'Halo apa kabar...'
              }
       );
       
       console.log(data)
```
