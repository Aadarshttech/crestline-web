import shutil

try:
    src = r"D:\Projects\Projects\alibaba\PRODUCT PICTURES AND CATALOGUES\µÁ∑ππ¯∫Õ—π¡¶π¯\À˘”–≤˙∆∑Õº∆¨\»˝∫œ“ª‘Á≤Õª˙\pressure cooker.png"
    dst = r"d:\Projects\Projects\alibaba\crestline-web\public\catalog\real_product_3_new.png"
    shutil.copy(src, dst)
    print("Copied successfully")
except Exception as e:
    print(f"Failed to copy: {e}")
