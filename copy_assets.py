import shutil
import os

src = r"d:\python\cherrystudio-for-houdini\web\out\renderer"
dst = r"d:\python\cherrystudio-for-houdini\cherrystudio\public"

print(f"Cleaning {dst}...")
if os.path.exists(dst):
    shutil.rmtree(dst)
os.makedirs(dst, exist_ok=True)

print(f"Copying from {src} to {dst}...")
shutil.copytree(src, dst, dirs_exist_ok=True)
print("Done.")
