
console.log('Перевірка підключеного файлу скриптів script.js')

async function getObjectsFromFile(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`HTTP помилка! статус: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка fetching JSON:', error);
  } finally {
    console.log('Fetch завершено!');
  }
}
async function buildItems(){
  const itemsData = await getObjectsFromFile('/items.json');
  console.log(itemsData);

  if (!itemsData) {
    console.error('Відсутні дані у JSON-файлі!');
    return;
  }

  const itemsDiv = document.getElementById("items");

  itemsData.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add("item");

    itemDiv.innerHTML = `
    
  <div class="item-title">${item.title}</div>

  <div class="item-image">
    <img src="img/${item.photo}" alt="${item.title}" class="motokosa-img" />
  </div>

  <div class="parts-pay">
    <div><img src="img/mono-lapka.png" alt="" />${item.paw}</div>
    <div><img src="img/pb.png" alt="" />${item.pb}</div>
  </div>

  <div class="price">
    <div><span>${item.standart_price}</span><sup>грн</sup></div>
    <div><span>${item.price}</span><sup>грн</sup></div>
  </div>

  <div class="price_bonus">
    ціна за купоном
    <div><span>${item.bonus_price}</span><sup>грн</sup></div>
  </div>

    `

    itemsDiv.appendChild(itemDiv);
  });
}

buildItems();