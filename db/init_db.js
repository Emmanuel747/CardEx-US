const {
  client,
  createUser,
  createCard,
  createGuest,
  createCartItem,
  addCardToCart,
  getAllCards,
  getAllUsers,
  deleteCard,
  createCart,
  addCartToUserOrder,
  createUserOrder,
  createUserAddress,
} = require("./index");

async function buildTables() {
  try {
    // client.connect();

    console.log("starting to drop tables");
    //DROP TABLE will go in here
    await client.query(`
        DROP TABLE IF EXISTS img;
        DROP TABLE IF EXISTS user_address;
        DROP TABLE IF EXISTS order_cards;
        DROP TABLE IF EXISTS user_order;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS cards;
        DROP TABLE IF EXISTS users;
        `);
    console.log("finished dropping tables");

    console.log("Starting to create tables");
    await client.query(`
            CREATE TABLE users(
                ID SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255) NOT NULL,
                admin BOOLEAN DEFAULT FALSE,
                UNIQUE(username, email)
            );
            CREATE TABLE cards(
              ID SERIAL PRIMARY KEY,
              card_title VARCHAR(255) NOT NULL,
              description VARCHAR(255) NOT NULL,
              price INTEGER NOT NULL,
              view_count INTEGER NOT NULL,
              card_img VARCHAR(255) NOT NULL,
              creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
              quantity INTEGER NOT NULL,
              active BOOLEAN DEFAULT TRUE
            );
            CREATE TABLE cart(
              ID SERIAL PRIMARY KEY,
              "cardId" INTEGER REFERENCES cards(ID),
              quantity INTEGER NOT NULL,
              "cartStatus" BOOLEAN NOT NULL,
              "userId" INTEGER NOT NULL,
              "orderDate" DATE NOT NULL DEFAULT CURRENT_DATE
            );
            CREATE TABLE user_address(
                ID SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
                street VARCHAR(255) NOT NULL,
                state VARCHAR(2) NOT NULL,
                zip_code INTEGER NOT NULL,
                UNIQUE("userId")
            );
            CREATE TABLE img(
                ID SERIAL PRIMARY KEY,
                "cardId" INTEGER REFERENCES cards(ID),
                name TEXT,
                img TEXT
            )
        `);
  } catch (error) {
    throw error;
  }
}

const createInitialCards = async () => {
    console.log("starting to create initial cards")
    try {
      const cardsToCreate = [
        {
          card_title: "2003-04 Lebron James Topps Rookie",
          description: "mint condition LBJ rookie card",
          price: "1200",
          view_count: "25",
          card_img:
            "https://th.bing.com/th/id/R4ec8fb7fe602023e56a0950eab2b69c6?rik=fF8DNf3Q%2bOblsQ&pid=ImgRaw",
          quantity: 20
        },
        {
          card_title: "Thanos - Boss Edition",
          description: "You could not live with your own failure. And where did that bring you? Back to me.",
          price: "35",
          view_count: "453",
          card_img: "https://wallpapercave.com/wp/wp4220291.jpg",
          quantity: 10
        },
        {
          card_title: "Fleer 1988 Reggie Miller Rookie Card",
          description: "Good condition Reggie Miller Rookie Card Rare PSA 9",
          price: "300",
          view_count: "278",
          card_img:
            "https://images-na.ssl-images-amazon.com/images/I/512KpkGffQL._SY300_QL70_.jpg",
          quantity: 40
        },
        {
          card_title: "1st Edition Charizard PSA 10",
          description:
            "Super rare Charizard PSA 10 only a few in the entire world",
          price: "750000",
          view_count: "4679",
          card_img:
            "https://th.bing.com/th/id/Rfc9fe0953c464ecb1e811c33bd24fe11?rik=J4phdw%2bQd%2brd6A&riu=http%3a%2f%2fi.ebayimg.com%2fimages%2fi%2f112406552365-0-1%2fs-l1000.jpg&ehk=bRrw8m%2bTRt23vwGkISKQVuPWVHaQY7GmKIPSaQ7UUZ4%3d&risl=&pid=ImgRaw",
          quantity: 25
        },
        {
          card_title: "1st edition Pikachu 1999",
          description:
            "Good condition Pikachu card 1st edition card. Great for any collector",
          price: "60",
          view_count: "140",
          card_img:
            "https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1067923.jpg",
          quantity: 17
        },
        {
          card_title: "2001 Bowman Drew Brees Rookie Card",
          description: "Great condition, card has slight wear on top left corner",
          price: "25",
          view_count: "9",
          card_img:
            "https://th.bing.com/th/id/OIP.abIUBSuuMwn2UoVumn57aAHaKY?pid=ImgDet&rs=1",
          quantity: 52
        },
        {
          card_title: "1998 Fleer Peyton Manning Rookie Autograph ",
          description:
            "Peyton Manning autograph and slabbed, the Sherrif himself autographed this",
          price: "240",
          view_count: "920",
          card_img:
            "https://th.bing.com/th/id/Rc4f63effff1a396de855a4922ced8953?rik=k1id3JtnW8KzGg&riu=http%3a%2f%2fcdn.sportsmemorabilia.com%2fsports-product-image%2f34-t4204666-2000.jpg&ehk=Bl4VYsp%2bo8LKk%2bkKMstHjsZIF%2fUrwpA4EdO%2fqQizPHI%3d&risl=&pid=ImgRaw",
          quantity: 104
        },
        {
          card_title: "1st Edition Squirtle",
          description:
            "1st edition Squirtle, card is in great condition and would be great for any pokemon collector",
          price: "45",
          view_count: "148",
          card_img:
            "https://th.bing.com/th/id/OIP.pGWduX1sZhiz3JPDtyC3rQAAAA?pid=ImgDet&rs=1",
          quantity: 250
        },
        {
          card_title: "1st Edition Venusaur PSA 10",
          description:
            "1st edition Venusaur PSA 10 gem-mint super Rare, perfect for any pokemon collector",
          price: "560",
          view_count: "97",
          card_img:
            "https://i.ebayimg.com/00/s/MTE1Mlg3Njg=/z/v3UAAOSw7bla~WOX/$_58.JPG",
          quantity: 9
        },
        {
          card_title: "2018-19 Prizm Trae Young Rookie Auto /75",
          description:
            "Trae Young rare rookie autograph, Beckett 9.5, buy while you still can!",
          price: "1100",
          view_count: "169",
          card_img: "https://i.ebayimg.com/images/g/zlYAAOSwuTpfSEbG/s-l300.jpg",
          quantity: 6
        },
        {
          card_title: "2017 Panini Select Alvin Kamara auto",
          description:
            "Alvin Kamara Rookie Signatures PSA gem mint 10, WHO DAT NATION",
          price: "450",
          view_count: "211",
          card_img:
            "https://i.pinimg.com/originals/5a/c7/9c/5ac79c77896bb53f7c0cb6f900822857.jpg",
          quantity: 45
        },
        {
          card_title: "2005 Topps Chrome Chris Paul Rookie",
          description: "CP3 topps chrome rookie card, PSA 10 gem mint",
          price: "1500",
          view_count: "320",
          card_img: "https://i.ebayimg.com/images/g/Zj0AAOSwGBtfMAdX/s-l400.jpg",
          quantity: 30
        },
        {
          card_title: "2015-16 Donruss Devin Booker RPA",
          description: "Devin Booker Donruss Rookie Patch Auto 05/99 SSP",
          price: "1350",
          view_count: "278",
          card_img:
            "https://img.beckett.com/images/items/12181139/marketplace/89164669/front.jpg",
          quantity: 89
        },
        {
          card_title: "2018 Select Darius Leonard Rookie Auto",
          description:
            "Darius Leonard Rookie autograph, SSP perfect for any colts collector",
          price: "110",
          view_count: "79",
          card_img:
            "https://kronozio.blob.core.windows.net/images/card/3fc70f4270cc489dafbb9f30c8aa90fb_front.jpg",
          quantity: 16
        },
        {
          card_title: "Rainbow Pikachu Vmax",
          description:
            "extremely rare pikachu card, the rainbow Pikachu is highly sought after",
          price: "450",
          view_count: "934",
          card_img:
            "https://www.hillscards.co.uk/images/pokemon-trading-card-game-188-185-pikachu-vmax-rare-rainbow-card-swsh-04-vivid-voltage-p63051-100501_image.jpg",
          quantity: 32
        },
        {
          card_title: "Magic Black Lotus (beta)",
          description:
            "the rarest of all Magic the gathering cards, great condition",
          price: "55000",
          view_count: "189",
          card_img:
            "https://th.bing.com/th/id/OIP._e_a5ZxVcLp52zoNebZwPAAAAA?pid=ImgDet&rs=1",
          quantity: 28
        },
        {
          card_title: "Magic Ancestral Recall (alpha)",
          description: "extremely rare Magic the gathering card",
          price: "25000",
          view_count: "669",
          card_img:
            "https://c1.scryfall.com/file/scryfall-cards/large/front/4/6/46b0a5c2-ac85-448e-9e87-12fc74fd4147.jpg?1559591672",
          quantity: 9
        },
        {
          card_title: "Magic Mox Ruby (alpha)",
          description:
            "One of the hardest Magic cards to find, great for any collector",
          price: "10000",
          view_count: "57",
          card_img:
            "https://product-images.tcgplayer.com/fit-in/400x558/9146.jpg",
          quantity: 88
        },
        {
          card_title: "2020 Donruss Kenny Moore autograph",
          description:
            "Donruss autograph from the best Corner in the league, Kenny Moore",
          price: "25",
          view_count: "74",
          card_img: "https://i.ebayimg.com/images/g/IDwAAOSwDphf8OYU/s-l300.jpg",
          quantity: 230
        }
      ];
        const products = await Promise.all(cardsToCreate.map(createCard))
        console.log("Cards created:")
        console.log(products)
        console.log("finished creating cards")
    } catch (error) {
        throw error
    }
}
 
const createInitialUsers = async () => {
  console.log("Starting to create intital users");
  try {
    const adminUser = {
      username: "admin",
      password: "adminPassword123",
      email: "admin@gmail.com",
      admin: true,
    };
    await createUser(adminUser);
    const usersToCreate = [
      {
        username: "Eman",
        password: "CodingGod69",
        email: "Eman@hotmail.com",
      },
      {
        username: "Astevens14",
        password: "GoColts20",
        email: "austinstevens@yahoo.com",
      },
      {
        username: "ChrisTheBoss",
        password: "CW123",
        email: "ChrisTheBoss@aol.com",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("users created:");
    console.log(users);
    console.log("Finished creating users");
  } catch (error) {
    console.error("there was an issues creating users");
    throw error;
  }
};

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await createInitialCards();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("starting to test the database");

    console.log("calling allCards");
    const products = await getAllCards();
    console.log("Results:", products);

    console.log("getting allUsers");
    const users = await getAllUsers();
    console.log("Results:", users);

    console.log("adding card to cart");
    const addCart = await createCartItem(2, 2);
    console.log("Cart Results:", addCart);
    const addCartTwo = await createCartItem(3, 1);
    console.log("Cart Two Results:", addCartTwo);
    const addCartThree = await createCartItem(3, 5);
    console.log("Cart Three Results:", addCartThree);

    console.log("calling createUserAddress");
    const userAddress = await createUserAddress({
      userId: 2,
      street: "2998 Old Taylor Road",
      state: "MS",
      zip_code: "38655",
    });
    console.log("Address Results:", userAddress);

    console.log("Finished database tests");
  } catch (error) {
    console.log("error during testDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
