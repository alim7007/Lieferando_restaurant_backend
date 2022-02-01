require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const MongoDBStore = require('connect-mongo')(session);
const User = require('./models/user');
const Bonus = require('./models/bonus');
const Siparisler = require('./models/dailyOrders');
const Category = require('./models/category')
const Menu = require('./models/menu');
const Sous = require('./models/sous');
const Seo = require('./models/seo')
const Text = require('./models/text');
const ClosingTime = require('./models/time');
const Distance = require('./models/distance');
const Blog = require('./models/blog');
const Mail = require('./models/mail');
const Paket = require('./models/paket')
const Paid = require('./models/paid');
const PizzaParts = require('./models/parts');
const PhoneNumber = require('./models/phone');
const Location = require('./models/location');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const cors = require('cors');
const morgan = require('morgan');
const jsonwebtoken = require("jsonwebtoken");

const BonusRoutes = require('./routes/bonus')
const PartRoutes = require('./routes/parts');
const userRoutes = require('./routes/users');
const textRoutes = require('./routes/text')
const menuRoutes = require('./routes/menu');
const paketRoutes = require('./routes/paket');
const phoneRoutes = require('./routes/phone')
const seoRoutes = require('./routes/seo');
const deliveryRoutes = require('./routes/email');
const orderRoutes = require('./routes/order');
const distRoutes = require('./routes/distance');
const TimeRoutes = require('./routes/time');
const blogRoutes = require('./routes/blog');
const locationRoutes = require('./routes/location')
const paymentRoute = require('./routes/payment')
const paidRoute = require('./routes/paid')
const categoryRoute = require('./routes/category')

const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')

AdminBro.registerAdapter(require('admin-bro-mongoose'))

//DB connection 
const dbUrl = process.env.DB_URL || 'mongodb://localhsot:271017/liferando';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

0
const port = process.env.PORT || 8000;
const app = express();


app.use(morgan("tiny"));
const adminBro = new AdminBro({
    resources: [User, PhoneNumber, Menu, Location, Blog, Paid, Category, Sous, Distance, Bonus, Mail, ClosingTime, Siparisler, PizzaParts, Paket, Text, Seo],
    rootPath: '/admin',
    branding: {
        logo: false,
        companyName: 'Dogunet',
        softwareBrothers: false
    }
})

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            if (password === user.password && user.role === 'admin') {
                return user
            }
        }
        return false
    },
    cookiePassword: 'session Key',
})


app.use(adminBro.options.rootPath, router)



app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'client/public')))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});


store.on("error", function (e) {
    console.log("Session store error", e);
});

const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());




app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});



app.use('/auth/', userRoutes);
app.use('/phone', phoneRoutes);
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/blog', blogRoutes);
app.use('/bonus', BonusRoutes);
app.use('/text', textRoutes);
app.use('/location', locationRoutes);
app.use('/charge', paymentRoute);
app.use('/seo', seoRoutes);
app.use('/paid', paidRoute);
app.use('/parts', PartRoutes);
app.use('/category', categoryRoute);
app.use('/distance', distRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/paket', paketRoutes);
app.use('/time', TimeRoutes);

const run = async () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Server is running on port " + port);
        }
    })
}

run();