<template>
  <div>
    <p>Данная утилита генерирует код файл pubspec для подключения шрифтов в приложение Flutter</p>
    <p>Для начала работы выберите папку со шрифтами ttf, которые необходимо подключить.</p>

    <button id="butDirectory" autofocus>open directory</button>

    <ul v-for="font of fonts">
      <li class="name">{{ font.name }}</li>
      <li v-for="item of font.items">{{ item.name }}</li>
    </ul>

    <pre>{{ code }}</pre>

  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';

// import './sample';

interface FontFile {
  name: string,
  kind: string
  type: string
}

interface Font {
  name: string,
  items: FontFile[]
}

@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {

  fonts: Font[] = []

  getFontWeight(fontFile: FontFile) {
    const sizes = [
      {"name": "Ultralight", "value": "100"},
      {"name": "UltraThin", "value": "100"},
      {"name": "ExtraThin", "value": "150"},
      {"name": "Thin","value": "200"},
      {"name": "ExtraLite", "value": "250"},
      {"name": "Lite", "value": "300"},
      {"name": "Light", "value": "300"},
      {"name": "Book", "value": "350"},
      {"name": "Text", "value": "375"},
      {"name": "Normal", "value": "400"},
      {"name": "Regular", "value": "400"},
      {"name": "Thick", "value": "425"},
      {"name": "ExtraThick", "value": "450"},
      {"name": "Medium", "value": "500"},
      {"name": "Dark", "value": "500"},
      {"name": "ExtraDark", "value": "550"},
      {"name": "Bold", "value": "600"},
      {"name": "ExtraBold", "value": "650"},
      {"name": "UltraBold", "value": "700"},
      {"name": "Black", "value": "800"},
      {"name": "Heavy", "value": "800"},
      {"name": "ExtraBlack", "value": "900"},
      {"name": "UltraBlack", "value": "999"},
    ]


    const _name = fontFile.name.split('.')[0].split('-')
    const type = _name[_name.length - 1] as string

    const item = sizes.find(e => type.toLowerCase().indexOf(e.name.toLowerCase()) != -1)

    if (item) {
      console.log(item)
      return item.value;
    }

    console.log(`not found  ${fontFile.name}`)

    return 500;
  }

  getFontFile(fontFile: FontFile) {
    return `
        - asset: assets/fonts/${fontFile.name}
          weight: ${this.getFontWeight(fontFile)}${fontFile.name.indexOf('Italic') != -1 ? `\n          style: italic` : ''}
`
  }

  getFont(font: Font) {
    return `
    - family: ${font.name}
      fonts:
${font.items.map(e => this.getFontFile(e)).join('').replaceAll('\n\n', '\n')}
`.replaceAll('\n\n', '\n');
  }

  get code() {
    return this.fonts.map(e => this.getFont(e)).join('');
  }

  mounted() {
    const butDir = document.getElementById('butDirectory');
    butDir?.addEventListener('click', async () => {
      const dirHandle = await (window as any).showDirectoryPicker();
      for await (const entry of dirHandle.values()) {
        if (entry.name.indexOf('.ttf') != -1) {
          console.log(entry.name)
          const _name = entry.name.split('.')[0].split('-')
          const name = _name.slice(0, -1).join('')
          const _font = this.fonts.find(e => e.name == name);
          if (_font) {
            _font.items.push(entry)
          } else {
            this.fonts.push({
              name: name,
              items: [entry],
            })
          }
        }
      }

      console.log(this.fonts)
    });
  }

}
</script>

<style>

.name {
  font-weight: bold;
}

</style>
