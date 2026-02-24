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
""
  // Handle "which of the following numbers is the largest: x, y, z"
  const largestMatch = query.match(/which of the following numbers is the largest:\s*([\d\s,]+)/i);
  if (largestMatch) {
    const numbersStr = largestMatch[1];
    const numbers = numbersStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (numbers.length > 0) {
      return Math.max(...numbers).toString();
    }
  }

  // Handle "what is x + y?" or "what is x plus y?"
  const additionMatch = query.match(/what is\s+([\d.]+)\s*(?:\+|plus)\s*([\d.]+)/i);
  if (additionMatch) {
    const num1 = parseFloat(additionMatch[1]);
    const num2 = parseFloat(additionMatch[2]);
    const result = num1 + num2;
    return (Number.isInteger(result) ? result.toString() : result.toString());
  }

  // Handle "what is x multiplied by y?"
  const multiplicationMatch = query.match(/what is\s+([\d.]+)\s*(?:multiplied by|times)\s*([\d.]+)/i);
  if (multiplicationMatch) {
    const num1 = parseFloat(multiplicationMatch[1]);
    const num2 = parseFloat(multiplicationMatch[2]);
    const result = num1 * num2;
    return (Number.isInteger(result) ? result.toString() : result.toString());
  }

  return "";
}
