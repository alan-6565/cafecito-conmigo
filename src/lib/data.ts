export const business = {
  name: "El Cafecito Conmigo",
  tagline: "Specialty Drinks · Redbulls · Matcha · More",
  city: "Hayward, CA",
  handle: "@elcafecitoconmigo",
  instagramUrl: "https://instagram.com/elcafecitoconmigo",
  tiktokUrl: "https://tiktok.com/@elcafecitoconmigo",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/catering", label: "Catering" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type Drink = { name: string; desc?: string; image: string; m: number; l: number };

export const lattes: Drink[] = [
  { name: "Chocobanana", desc: "Chocolate rim, banana base, mocha soft top, fresh banana & chocolate syrup.", image: "/images/d-chocobanana.jpg", m: 6, l: 8 },
  { name: "Banana Cream Pie", desc: "Lechera rim, vanilla base, banana cold foam, nilla wafers & fresh banana topping.", image: "/images/d-banana-cream-pie.jpg", m: 6, l: 8 },
  { name: "Chocolate Covered Strawberry", desc: "Chocolate rim, chocolate & strawberry base, cold foam, fresh strawberries & drizzle.", image: "/images/d-choc-strawberry.jpg", m: 6, l: 8 },
  { name: "Strawberry Cupcake", desc: "Marshmallow rim, cupcake base, strawberry cold foam, pink sugar & sprinkles.", image: "/images/d-strawberry-cupcake.jpg", m: 6, l: 8 },
  { name: "Churro Cheesecake", desc: "Dulce de leche rim, brown sugar cinnamon base, cheesecake soft top, graham cracker + cinnamon sugar.", image: "/images/d-churro-cheesecake.jpg", m: 6, l: 8 },
  { name: "Vanilla Cupcake", desc: "Marshmallow rim, cupcake base, vanilla cold foam & sprinkles.", image: "/images/d-vanilla-cupcake.jpg", m: 6, l: 8 },
  { name: "Pumpkin Cheesecake", desc: "Fall favorite! Pumpkin base, cheesecake cold foam, graham cracker topping.", image: "/images/d-pumpkin-cheesecake.jpg", m: 6, l: 8 },
  { name: "Pumpkin Horchata", desc: "Pumpkin horchata base, whipped cream, cinnamon dust & drizzle.", image: "/images/d-pumpkin-horchata.jpg", m: 6, l: 8 },
  { name: "Banana Biscoff", desc: "Banana base, biscoff drizzle, cookie butter & cookie crumbles.", image: "/images/d-banana-biscoff.jpg", m: 6, l: 8 },
  { name: "Cinnamon Roll", desc: "Cinnamon base, brown sugar cold foam, cinnamon drizzle & cookie crumble.", image: "/images/d-cinnamon-roll.jpg", m: 6, l: 8 },
];

export const matchas: Drink[] = [
  { name: "Strawberry Matcha Latte", image: "/images/d-strawberry-matcha.jpg", m: 6, l: 8 },
  { name: "Vanilla Matcha Latte", image: "/images/d-vanilla-matcha.jpg", m: 6, l: 8 },
  { name: "Blueberry Matcha Latte", image: "/images/d-blueberry-matcha.jpg", m: 6, l: 8 },
];

export const redbulls: Drink[] = [
  { name: "Strawberry Redbull", image: "/images/d-strawberry-redbull.jpg", m: 7, l: 9 },
  { name: "Blue Raspberry Redbull", image: "/images/d-blue-raspberry-redbull.jpg", m: 7, l: 9 },
  { name: "Mango Redbull", image: "/images/d-mango-redbull.jpg", m: 7, l: 9 },
];

export const seasonal = ["Pumpkin Cheesecake", "Pumpkin Cookie Butter", "Pumpkin Horchata", "Banana Bread Latte"];
