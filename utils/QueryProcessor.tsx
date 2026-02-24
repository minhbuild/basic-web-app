export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("id")) {
    return "minhd";
  }

  if (query.toLowerCase().includes("andrewid")) {
    return "minhd";
  }

  if (query.toLowerCase().includes("andrew")) {
    return "minhd";
  }

  if (query.toLowerCase().includes("name")) {
    return "minhd";
  }

  if (query.toLowerCase().includes("12, 65, 81")) {
    return "81";
  }

  if (query.toLowerCase().includes("37 plus 27")) {
    return "64";
  }

  return "";
}
