from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
import joblib

# Ambil data iris
X, y = load_iris(return_X_y=True)
# Latih model sederhana
clf = RandomForestClassifier()
clf.fit(X, y)
# Simpan model ke file
joblib.dump(clf, 'model.pkl')
print("Model 'model.pkl' berhasil dibuat di folder backend!")