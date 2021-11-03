function getFieldSort(name) {
  switch (name) {
    case "feed":
      return "quantityComment";
    case "top":
      return "reaction.quantity";
    default:
      return "createdAt";
  }
}

export default getFieldSort;
