# DELETE THIS FILE AND THE ENDPOINT AFTER CREATING ADMIN USER!

## Security Warning
The file `store/src/api/admin/create-user/route.ts` is a TEMPORARY endpoint that allows anyone to create admin users. 

## After Creating Your Admin User:

1. Delete the file:
   ```bash
   rm store/src/api/admin/create-user/route.ts
   ```

2. Commit and push:
   ```bash
   git add -A
   git commit -m "Remove temporary admin creation endpoint"
   git push
   ```

This is critical for security!