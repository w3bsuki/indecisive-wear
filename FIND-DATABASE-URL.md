# Where to Find Your PostgreSQL DATABASE_URL on Render

## Step-by-Step with Screenshots Locations:

### 1. Go to Your PostgreSQL Database
- Login to [Render Dashboard](https://dashboard.render.com)
- Click on your database (should be named `indecisive-wear-db` or similar)

### 2. Find the Connection Details
Once inside your database dashboard, look for:

**Option A: Quick Copy (Recommended)**
- Look for a section called **"Connections"** or **"Connect"**
- You'll see **"Internal Database URL"** - this is what you want!
- Click the **copy icon** next to it
- It looks like: `postgresql://indecisive_wear:XXXXX@dpg-XXXXX-a.oregon-postgres.render.com/indecisive_wear_db`

**Option B: Manual Construction**
If you can't find the URL, look for these details:
- **Username**: (e.g., `indecisive_wear`)
- **Password**: (long random string)
- **Hostname**: (e.g., `dpg-xxxxx-a.oregon-postgres.render.com`)
- **Port**: `5432` (default)
- **Database**: (e.g., `indecisive_wear_db`)

Then construct it:
```
postgresql://USERNAME:PASSWORD@HOSTNAME:5432/DATABASE
```

### 3. IMPORTANT: Internal vs External URL
- **Internal Database URL**: Use this! (Faster, free, works within Render)
- **External Database URL**: Don't use (counts against free tier limits)

### 4. Where It Shows in Render Dashboard

The database page typically has these sections:
```
┌─────────────────────────────────────┐
│ Database Name: indecisive-wear-db  │
│ Status: Available ✓                 │
├─────────────────────────────────────┤
│ Connections                         │
│                                     │
│ Internal Database URL               │
│ [████████████████████] [Copy]       │
│                                     │
│ External Database URL               │
│ [████████████████████] [Copy]       │
│                                     │
│ PSQL Command                        │
│ [████████████████████] [Copy]       │
└─────────────────────────────────────┘
```

### 5. If You Still Can't Find It

1. Check the **"Connect"** button/tab on your database page
2. Look for **"Connection Strings"** section
3. Check **"Environment"** tab - sometimes it's there
4. Look for any section with **"postgres://"** or **"postgresql://"**

### Common Issues:
- Database still creating? Wait 2-3 minutes
- Can't see passwords? Click "Reveal" or eye icon
- Multiple databases? Make sure you're in the right one

Once you find it, copy the **Internal Database URL** and paste it as the `DATABASE_URL` environment variable in your Web Service!