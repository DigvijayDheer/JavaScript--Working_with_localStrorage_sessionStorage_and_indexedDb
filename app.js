const storeBtn = document.getElementById("store-btn");
const retrieveBtn = document.getElementById("retrieve-btn");

// LOCAL STORAGE & SESSION STORAGE
// const userId = "user_123";
// const user = {
// 	name: "Jane",
// 	age: 1,
// };

// storeBtn.addEventListener("click", () => {
// 	sessionStorage.setItem("uid", userId);
// 	localStorage.setItem("user", JSON.stringify(user));
// });

// retrieveBtn.addEventListener("click", () => {
// 	const extractedId = sessionStorage.getItem("uid");
// 	const extractedUserData = JSON.parse(localStorage.getItem("user"));
// 	if (extractedId) {
// 		console.log(`User Id is ${extractedId}`);
// 		console.log(extractedUserData);
// 	} else {
// 		console.log("Couldn't find User...");
// 	}
// });

// WORKING WITH COOKIES

// storeBtn.addEventListener("click", () => {
// 	const userId = "u123456";
// 	const user = {
// 		name: "Max",
// 		age: "30",
// 	};
// 	document.cookie = `uid=${userId}`;
// 	document.cookie = `user=${JSON.stringify(user)}`;
// });

// retrieveBtn.addEventListener("click", () => {
// 	const cookieData = document.cookie.split(";");
// 	const data = cookieData.map((i) => {
// 		return i.trim();
// 	});
// 	console.log(data);
// 	console.log(data[1].split("=")[1]);
// });

// WORKING WITH INDEXEDDB
let db;

const dbRequest = indexedDB.open("StorageDummy", 1);

dbRequest.onsuccess = (event) => {
	db = event.target.result;
};

dbRequest.onupgradeneeded = (event) => {
	db = event.target.result;

	const objStore = db.createObjectStore("products", { keyPath: "id" });

	objStore.transaction.oncomplete = (event) => {
		const productStore = db
			.transaction("products", "readwrite")
			.objectStore("products");

		productStore.add({
			id: "p1",
			title: "First product",
			price: 20,
			tags: ["Expensive", "Luxury"],
		});
	};
};

dbRequest.onerror = (event) => {
	console.log("Error!");
};

storeBtn.addEventListener("click", () => {
	if (db) {
		const productStore = db
			.transaction("products", "readwrite")
			.objectStore("products");

		productStore.add({
			id: "p2",
			title: "Second product",
			price: 200,
			tags: ["Expensive", "Luxury"],
		});
	} else {
		return;
	}
});

retrieveBtn.addEventListener("click", () => {
	const productStore = db
		.transaction("products", "readwrite")
		.objectStore("products");
	const request = productStore.get("p2");

	request.onsuccess = (event) => {
		console.log(request.result);
	};
});
