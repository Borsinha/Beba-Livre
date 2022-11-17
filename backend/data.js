import bcrypt from "bcryptjs";
const data = {

    users:[
        {
            name: 'Vitor',
            user: 'admin',
            password: bcrypt.hashSync('332200')
        },
        {
            name: 'Borsinha',
            user: 'admin2',
            password: bcrypt.hashSync('002233')
        }

    ],

    products: [
        {   
            //_id: '0',
            name: 'Jack Daniels Single Barrel 750ml',
            onSale: 1,
            slug: 'jack-single-750ml',
            price: 300,
            type: 'Tenneesse Single Barrel Whisky',
            image: '/images/jack-single-750ml.jpg'
        },
        {
            //_id: '1',
            name: 'Grand Old Parr 12 Years 1L',
            onSale: 1,
            slug: 'old-parr-12-1l',
            price: 200,
            type: 'Scotch Blended Whisky',
            image: '/images/old-parr-12-1l.jpg'
        },
        {
            //_id: '2',
            name: 'Buchanans Deluxe 12 Years 1L',
            onSale: 1,
            slug: 'buchanans-deluxe-12-1l',
            price: 200,
            type: 'Scotch Blended Whisky',
            image: '/images/buchanans-12-1l.jpg'
        },
        {
            //_id: '3',
            name: 'Singleton of Dufftown 12 Years 750ml',
            onSale: 1,
            slug: 'singleton-12-750ml',
            price: 180,
            type: 'Scotch Single Malt Whisky',
            image: '/images/singleton-12-750ml.png'
        },
        {
            //_id: '4',
            name: 'Johnnie Walker Black Label 12 Years 1L',
            onSale: 1,
            slug: 'black-label-12-1l',
            price: 150,
            type: 'Scotch Blended Whisky',
            image: '/images/black-label-12-1l.jpg'
        },
    ],
};
export default data;