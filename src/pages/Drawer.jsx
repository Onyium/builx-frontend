const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 🔴 REEMPLAZA ESTO CON EL ENLACE QUE TE DIO FORMSPREE
      const FORMSPREE_URL = 'https://formspree.io/f/TU_CODIGO_AQUI';

      // Armamos el paquete con los datos bonitos para que los leas fácil en tu correo
      const payload = {
        "1. Raza Seleccionada": selectedBreed ? selectedBreed.name : 'Personalizado',
        "2. Nombre del Cliente": formData.ownerName,
        "3. WhatsApp": formData.whatsapp,
        "4. Nombre de la Mascota": formData.petName,
        "5. Año de Nacimiento": formData.birthYear,
        "6. Año de Partida": formData.deathYear,
      };

      // Hacemos el envío
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log("✅ Pedido enviado al correo con éxito");
        setIsSubmitted(true);
      } else {
        alert("Ocurrió un problema al enviar los datos. Intenta nuevamente.");
      }
      
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Hubo un error de conexión. Revisa tu internet e intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };