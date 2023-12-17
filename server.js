const express = require("express");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const con = require("./utils/db.js");
const bcrypt = require("bcrypt");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not authenticated" });
  }
};


// =============== USERS ROUTES ===================== //

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ?";
  con.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });

    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });

          if (response) {
            const name = data[0].name;
            const token = Jwt.sign({ name }, "jwt-secret-key", {
              expiresIn: "1d",
            });

            res.cookie("token", token);

            return res.json({ loginStatus: true, user_name:name, user_email : req.body.email });
          } else {
            return res.json({
              loginStatus: false,
              Error: "wrong email or password",
            });
          }
        }
      );
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  const hashedPassword = bcrypt.hashSync(password, 10);

  const checkUserExistsSQL = "SELECT * FROM login WHERE email = ?";

  con.query(checkUserExistsSQL, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ registrationStatus: false, error: "Query error" });
    }

    if (result.length > 0) {
      return res.json({
        registrationStatus: false,
        error: "User with this email already exists",
      });
    } else {
      const insertUserSQL =
        "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";

      con.query(insertUserSQL, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ registrationStatus: false, error: "Registration failed" });
        }

        return res.json({ Status: "Success" });
      });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});


app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

app.listen(5000, () => {
  console.log("Server is running");
});
