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
  // Handle "what is <expression>?" with order of operations (^, *, +, -)
  const complexExprMatch = query.match(/what is\s+(.+?)(\?)?$/i);
  if (complexExprMatch) {
    const expr = complexExprMatch[1].trim();
    
    // Check if it contains mathematical operators
    if (/(?:\+|plus|-|minus|\*|multiplied|times|\^|to\s+the\s+power\s+of)/i.test(expr)) {
      // Normalize the expression: replace word operators with symbols
      let normalized = expr
        .replace(/\s+to\s+the\s+power\s+of\s+/gi, ' ^ ')
        .replace(/\s+multiplied\s+by\s+/gi, ' * ')
        .replace(/\s+times\s+/gi, ' * ')
        .replace(/\s+plus\s+/gi, ' + ')
        .replace(/\s+minus\s+/gi, ' - ')
        .replace(/\s+/g, ' '); // normalize spaces
      
      // Parse expression respecting order of operations using BigInt for large numbers
      // Split by + and -, keeping the operators
      const addSubTokens = normalized.split(/\s*([+-])\s*/);
      
      let result = BigInt(0);
      let currentOp = '+';
      
      for (let i = 0; i < addSubTokens.length; i++) {
        const token = addSubTokens[i].trim();
        
        if (token === '+' || token === '-') {
          currentOp = token;
        } else if (token) {
          // Evaluate multiplication within this term
          const mulParts = token.split(/\s*\*\s*/).map(mulTerm => {
            // Evaluate exponentiation within each multiplication term
            const expParts = mulTerm.trim().split(/\s*\^\s*/).map(p => p.trim());
            let termResult = BigInt(expParts[0]);
            for (let j = 1; j < expParts.length; j++) {
              termResult = termResult ** BigInt(expParts[j]);
            }
            return termResult;
          });
          let termResult = mulParts.reduce((a, b) => a * b, BigInt(1));
          
          if (currentOp === '+') {
            result += termResult;
          } else if (currentOp === '-') {
            result -= termResult;
          }
        }
      }
      
      return result.toString();
    }
  }

  // Handle "what is x + y?" or "what is x plus y?" (generalized for multiple additions)
  const additionMatch = query.match(/what is\s+([\d.]+(?:\s*(?:\+|plus)\s*[\d.]+)*)/i);
  if (additionMatch) {
    const expressionStr = additionMatch[1];
    const numbers = expressionStr.split(/\s*(?:\+|plus)\s*/i).map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (numbers.length > 0) {
      const result = numbers.reduce((sum, num) => sum + num, 0);
      return (Number.isInteger(result) ? result.toString() : result.toString());
    }
  }

  // Handle "what is x minus y?" or "what is x - y?"
  const subtractionMatch = query.match(/what is\s+([\d.]+)\s*(?:-|minus)\s*([\d.]+)/i);
  if (subtractionMatch) {
    const num1 = parseFloat(subtractionMatch[1]);
    const num2 = parseFloat(subtractionMatch[2]);
    const result = num1 - num2;
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

  // Handle "which of the following numbers is both a square and a cube:"
  const squareAndCubeMatch = query.match(/which of the following numbers is both a square and a cube:\s*([\d\s,]+)/i);
  if (squareAndCubeMatch) {
    const numbersStr = squareAndCubeMatch[1];
    const numbers = numbersStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    
    for (const num of numbers) {
      const sqrtVal = Math.sqrt(num);
      const cbrtVal = Math.cbrt(num);
      if (Number.isInteger(sqrtVal) && Number.isInteger(cbrtVal)) {
        return num.toString();
      }
    }
  }

  // Handle "which of the following numbers are primes:"
  const primesMatch = query.match(/which of the following numbers are primes:\s*([\d\s,]+)/i);
  if (primesMatch) {
    const numbersStr = primesMatch[1];
    const numbers = numbersStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    
    const isPrime = (num: number): boolean => {
      if (num < 2) return false;
      if (num === 2) return true;
      if (num % 2 === 0) return false;
      for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
      }
      return true;
    };

    const primes = numbers.filter(num => isPrime(num));
    return primes.length > 0 ? primes.join(', ') : "";
  }

  return "";
}
