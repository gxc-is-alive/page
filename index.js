// 读取images/4399的所有文件
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const images = fs.readdirSync(path.join(__dirname, 'images/4399'));
// 把所有图片转换成webp（使用cwebp）


const allowedTypes = ['image/jpeg', 'image/png'];

const convertToWebp = async (file, commonPath, output) => {
    console.log(output);
//   const isImage = allowedTypes.includes(file.mimetype);
//   const isGif = file.mimetype === 'image/gif';
//   file.filename = isImage && !isGif ? file.filename.replace(/\.[^.]+$/, '.webp') : file.filename;
    try {
      await sharp(file)
        .toFormat('webp')
        .webp({quality: 80, effort: 6})
        .toFile(output);
    //   fs.unlinkSync(filepath);
    } catch (e) {
      console.error(e);
    }
};

images.forEach(image => {
    if (image.includes('.webp')) {
        return;
    }
    if (image.includes('.gif')) {
        return;
    }
    // 取file
    fs.readFile(`./images/4399/${image}`, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const output = path.resolve(__dirname, './', 'images/4399', `${image.replace(/\.[^.]+$/, '.webp')}`);
        convertToWebp(data, 'images/4399', output);
      });

    // 转换成webp
});
const dom = [];
images.forEach(image => {
    if (image.includes('banner-')) {
        dom.push(`
            <a href="javascript:void(0);" class="animsition-link"></a>
                <div class="portfolio-box-1 banner">
                    <div class="mask-1"></div>
                    <img src="/images/4399/${image}" alt="">
                    <h6>Banner</h6>
                    <div class="line-mask"></div>
                    <p>${image.replaceAll('banner-', '').replaceAll('.webp', '').replaceAll('.jpg', '').replaceAll('.png', '').replaceAll('.gif', '')}</p>
                </div>
            </a>
        `);
    } else if (image.includes('h5-')) {
        dom.push(`
            <a href="javascript:void(0);" class="animsition-link"></a>
                <div class="portfolio-box-1 h5">
                    <div class="mask-1"></div>
                    <img src="/images/4399/${image}" alt="">
                    <h6>H5</h6>
                    <div class="line-mask"></div>
                    <p>${image.replaceAll('h5-', '').replaceAll('.webp', '').replaceAll('.jpg', '').replaceAll('.png', '').replaceAll('.gif', '')}</p>
                </div>
            </a>
        `);
    } else if (image.includes('ui-')) {
        dom.push(`
            <a href="javascript:void(0);" class="animsition-link"></a>
                <div class="portfolio-box-1 ui">
                    <div class="mask-1"></div>
                    <img src="/images/4399/${image}" alt="">
                    <h6>UI</h6>
                    <div class="line-mask"></div>
                    <p>${image.replaceAll('ui-', '').replaceAll('.webp', '').replaceAll('.jpg', '').replaceAll('.png', '').replaceAll('.gif', '')}</p>
                </div>
            </a>
        `);
    } else if (image.includes('other-')) {
        dom.push(`
            <a href="javascript:void(0);" class="animsition-link"></a>
                <div class="portfolio-box-1 other">
                    <div class="mask-1"></div>
                    <img src="/images/4399/${image}" alt="">
                    <h6>其他</h6>
                    <div class="line-mask"></div>
                    <p>${image.replaceAll('other-', '').replaceAll('.webp', '').replaceAll('.jpg', '').replaceAll('.png', '').replaceAll('.gif', '')}</p>
                </div>
            </a>
        `);
    }
});

// 把DOM写入到index.html中
fs.writeFileSync(path.join(__dirname, '生成.html'), dom.join(''));
