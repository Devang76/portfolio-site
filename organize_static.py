
import os
import shutil

def fix_and_organize():
    base_dir = r"c:\Users\10674\Desktop\Antigravity\Portfolio\static"
    
    # Define intended directories
    folders = ['images', 'pdfs', 'audio', 'video']
    
    # 1. Check if 'columns' act as files (the accidental rename issue)
    # Map of file_size -> original_name_guess (or just valid extension to recover)
    # Actually, I know which files were likely renamed based on the previous context.
    
    # images file -> likely "ChatGPT Image Dec 21, 2025, 03_23_02 AM.png"
    images_file = os.path.join(base_dir, 'images')
    if os.path.isfile(images_file):
        print("Recovering 'images' file to png...")
        shutil.move(images_file, os.path.join(base_dir, 'recovered_image.png'))
        
    # audio file -> likely "AI_Mastery_Requires_Himalayan_Endurance.m4a"
    audio_file = os.path.join(base_dir, 'audio')
    if os.path.isfile(audio_file):
        print("Recovering 'audio' file to m4a...")
        shutil.move(audio_file, os.path.join(base_dir, 'AI_Mastery_Requires_Himalayan_Endurance.m4a'))
        
    # pdfs file -> likely "Report.pdf"
    pdfs_file = os.path.join(base_dir, 'pdfs')
    if os.path.isfile(pdfs_file):
        print("Recovering 'pdfs' file to pdf...")
        shutil.move(pdfs_file, os.path.join(base_dir, 'Report.pdf'))
        
    # 2. Create directories
    for folder in folders:
        path = os.path.join(base_dir, folder)
        if not os.path.exists(path):
            os.makedirs(path)
            print(f"Created directory: {path}")
            
    # 3. Move files
    for filename in os.listdir(base_dir):
        file_path = os.path.join(base_dir, filename)
        if os.path.isdir(file_path):
            continue
            
        lower_name = filename.lower()
        
        # Images
        if lower_name.endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
            shutil.move(file_path, os.path.join(base_dir, 'images', filename))
            print(f"Moved {filename} to images")
            
        # PDF/Docs
        elif lower_name.endswith(('.pdf', '.doc', '.docx')):
            shutil.move(file_path, os.path.join(base_dir, 'pdfs', filename))
            print(f"Moved {filename} to pdfs")
            
        # Audio
        elif lower_name.endswith(('.mp3', '.m4a', '.wav')):
            shutil.move(file_path, os.path.join(base_dir, 'audio', filename))
            print(f"Moved {filename} to audio")
            
        # Video
        elif lower_name.endswith(('.mp4', '.mov', '.avi')):
            shutil.move(file_path, os.path.join(base_dir, 'video', filename))
            print(f"Moved {filename} to video")

if __name__ == "__main__":
    fix_and_organize()
