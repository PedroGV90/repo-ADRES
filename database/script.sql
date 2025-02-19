USE [db_ab2f76_adres];
GO

-- Elimina la tabla si existe
DROP TABLE IF EXISTS Adquisiciones;
GO

-- Crea la tabla Adquisiciones
CREATE TABLE Adquisiciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,       -- Identificador único de la adquisición
    Presupuesto DECIMAL(18,2),              -- Monto asignado
    Unidad VARCHAR(100),                    -- Unidad administrativa responsable
    TipoBienServicio VARCHAR(255),          -- Descripción del tipo de bien o servicio
    Cantidad INT,                           -- Número de unidades
    ValorUnitario DECIMAL(18,2),            -- Costo por unidad
    ValorTotal AS (Cantidad * ValorUnitario), -- Cálculo del costo total
    FechaAdquisicion DATE,                  -- Fecha de la adquisición
    Proveedor VARCHAR(255),                 -- Entidad proveedora
    Documentacion TEXT                      -- Detalles de la documentación (órdenes de compra, facturas, etc.)
);
GO

-- Procedimiento almacenado para CRUD de Adquisiciones
CREATE OR ALTER PROCEDURE CRUD_Adquisiciones
    @Opcion VARCHAR(10),                   -- Opción para determinar la operación (Insertar, Actualizar, Eliminar, Leer)
    @Id INT = NULL,                        -- ID de la adquisición (solo para actualizar o eliminar)
    @Presupuesto DECIMAL(18,2) = NULL,     -- Monto asignado
    @Unidad VARCHAR(100) = NULL,           -- Unidad administrativa responsable
    @TipoBienServicio VARCHAR(255) = NULL, -- Descripción del tipo de bien o servicio
    @Cantidad INT = NULL,                  -- Número de unidades
    @ValorUnitario DECIMAL(18,2) = NULL,   -- Costo por unidad
    @FechaAdquisicion DATE = NULL,         -- Fecha de la adquisición
    @Proveedor VARCHAR(255) = NULL,        -- Entidad proveedora
    @Documentacion TEXT = NULL            -- Detalles de la documentación
AS
BEGIN
    SET NOCOUNT ON;

    IF @Opcion = 'Insertar'  -- Insertar nueva adquisición
    BEGIN
        INSERT INTO Adquisiciones (Presupuesto, Unidad, TipoBienServicio, Cantidad, ValorUnitario, FechaAdquisicion, Proveedor, Documentacion)
        VALUES (@Presupuesto, @Unidad, @TipoBienServicio, @Cantidad, @ValorUnitario, @FechaAdquisicion, @Proveedor, @Documentacion);
    END

    ELSE IF @Opcion = 'Actualizar'  -- Actualizar adquisición existente
    BEGIN
        IF @Id IS NOT NULL
        BEGIN
            UPDATE Adquisiciones
            SET 
                Presupuesto = @Presupuesto,
                Unidad = @Unidad,
                TipoBienServicio = @TipoBienServicio,
                Cantidad = @Cantidad,
                ValorUnitario = @ValorUnitario,
                FechaAdquisicion = @FechaAdquisicion,
                Proveedor = @Proveedor,
                Documentacion = @Documentacion
            WHERE Id = @Id;
        END
    END

    ELSE IF @Opcion = 'Eliminar'  -- Eliminar adquisición
    BEGIN
        IF @Id IS NOT NULL
        BEGIN
            DELETE FROM Adquisiciones WHERE Id = @Id;
        END
    END

    ELSE IF @Opcion = 'Leer'  -- Leer adquisiciones
    BEGIN
        SELECT * FROM Adquisiciones;
    END
    ELSE
    BEGIN
        PRINT 'Opción no válida. Use "Insertar", "Actualizar", "Eliminar" o "Leer".';
    END
END;
GO

EXEC CRUD_Adquisiciones 
	@Opcion = 'Leer'

-- // DATOS DE ACCESO A LA BASE DE DATOS
-- SERVER: sql1002.site4now.net
-- DATABASE: db_ab2f76_adres
-- PASS: IronMan2024.*.
-- USER: db_ab2f76_adres_admin