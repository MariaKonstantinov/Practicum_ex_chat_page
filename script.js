const messageList = [
  {
    image: "https://code.s3.yandex.net/web-code/card__image.jpg",
    text: "Hi, we need to tune up our chat ASAP!",
  },
  {
    text: "Here is the user's chat card",
    isOwner: true,
  },
  {
    image: "https://code.s3.yandex.net/web-code/card__image.jpg",
    text: "The response!",
  },
];

class Card {
  // the constructor and other methods
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
  }

  // _getTemplate code
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._element = cardElement;
  }

  // _setEventListeners code
  _setEventListeners() {
    this._element.querySelector(".card__text").addEventListener("click", () => {
      this._handleMessageClick();
    });
  }

  // _handleMessageClick code
  _handleMessageClick() {
    this._element
      .querySelector(".card__text")
      .classList.toggle("card__text_is-active");
  }
}

class UserCard extends Card {
  // the constructor and other methods
  constructor(data, cardSelector) {
    // the super keyword calls the constructor of the parent
    // class with a single argument which is template selector
    super(cardSelector);
    // user card has text only
    this._text = data.text;
  }

  // generateCard code
  generateCard() {
    super._getTemplate();
    super._setEventListeners();

    this._element.querySelector(".card__paragraph").textContent = this._text;

    return this._element;
  }

  _handleMessageClick() {
    super._handleMessageClick(); // calling a parent method

    // adding new functionality to _handleMessageClick:
    // this._element stores a card element
    // let's add the card_is-active class to it

    this._element.classList.toggle("card_is-active");
  }
}

class DefaultCard extends Card {
  constructor(data, cardSelector) {
    // the super keyword calls the constructor of the parent
    super(cardSelector);
    // the person on the other end now has both an avatar and a text
    this._text = data.text;
    this._image = data.image;
  }

  // generateCard code
  generateCard() {
    super._getTemplate(); // this replaced with super
    super._setEventListeners(); // this replaced with super

    this._element.querySelector(".card__avatar").src = this._image;
    this._element.querySelector(".card__paragraph").textContent = this._text;

    return this._element;
  }
}

messageList.forEach((item) => {
  // If the isOwner value === true,
  // a UserCard instance is created,
  // otherwise DefaultCard is created

  const card = item.isOwner
    ? new UserCard(item, ".card-template_type_user")
    : new DefaultCard(item, ".card-template_type_default");

  const cardElement = card.generateCard();

  document.body.append(cardElement);
});
