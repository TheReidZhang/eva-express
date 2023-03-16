import { z } from 'zod';

const schema = z.object({
  id: z.string().transform(BigInt),
});
BigInt.prototype['toJSON'] = function () {
    return this.toString();
};
  
const result = schema.safeParse({ id: '9223372036854775808' });
if (result.success) {
  const args = result.data;
  console.log(JSON.stringify(args));
}

