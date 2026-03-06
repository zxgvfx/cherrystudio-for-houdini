// 一次性数据库修复脚本
// 在项目根目录运行: node fix_database.js

const Dexie = require('dexie');
const path = require('path');
const os = require('os');

// 数据库路径 - 根据你的实际路径调整
const dbPath = path.join(os.homedir(), '.cherrystudio');

console.log('[FixDB] Database path:', dbPath);
console.log('[FixDB] Starting database fix...');

// 创建数据库连接
const db = new Dexie('CherryStudio', { 
  indexedDB: require('fake-indexeddb'),
  IDBKeyRange: require('fake-indexeddb/lib/FDBKeyRange')
});

db.version(10).stores({
  files: 'id, name, origin_name, path, size, ext, type, created_at, count',
  // ... 其他表
});

async function fixDatabase() {
  try {
    await db.open();
    console.log('[FixDB] Database opened successfully');
    
    const files = await db.files.toArray();
    console.log(`[FixDB] Found ${files.length} files to check`);
    
    let fixed = 0;
    
    for (const file of files) {
      let needsUpdate = false;
      const updates = {};
      
      if (typeof file.size === 'object' && file.size !== null) {
        console.log(`[FixDB] File ${file.id} has object size:`, file.size);
        updates.size = file.size.size || 0;
        needsUpdate = true;
      }
      
      if (typeof file.count === 'object' && file.count !== null) {
        console.log(`[FixDB] File ${file.id} has object count:`, file.count);
        updates.count = file.count.count || 0;
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await db.files.update(file.id, updates);
        fixed++;
        console.log(`[FixDB] Fixed file ${file.id}:`, updates);
      }
    }
    
    console.log(`[FixDB] ✅ Fixed ${fixed} out of ${files.length} files`);
    await db.close();
  } catch (error) {
    console.error('[FixDB] ❌ Error:', error);
  }
}

fixDatabase();

